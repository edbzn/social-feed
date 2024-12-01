import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { SocialFeedDataAccess } from '@social-feed/social-feed-data-access';
import { SocialPostModel } from '@social-feed/social-feed-model';
import { SocialPostComponent } from '@social-feed/social-feed-ui';
import { tap } from 'rxjs';

const trackById = <T extends { id: string }>(_idx: number, item: T) => item.id;

@Component({
  selector: 'social-feed-feature',
  standalone: true,
  imports: [
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    ScrollingModule,
    SocialPostComponent,
  ],
  template: `
    <ion-content class="ion-padding" scroll-y="false">
      <cdk-virtual-scroll-viewport
        itemSize="450"
        minBufferPx="1500"
        maxBufferPx="3000"
        class="ion-content-scroll-host"
      >
        <social-post-ui
          *cdkVirtualFor="let post of posts(); trackBy: trackById"
          [post]="post"
        />
        <ion-infinite-scroll (ionInfinite)="loadPosts()">
          <ion-infinite-scroll-content
            #infiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
          />
        </ion-infinite-scroll>
      </cdk-virtual-scroll-viewport>
    </ion-content>
  `,
  styles: `
    cdk-virtual-scroll-viewport {
      height: 100%;
      width: 100%;
    }
  `,
})
export default class SocialFeedFeatureComponent {
  private readonly socialFeedDataAccess = inject(SocialFeedDataAccess);
  private readonly IonInfiniteScroll = viewChild.required(IonInfiniteScroll);

  private readonly index = signal(0);
  private readonly postsResource = rxResource({
    request: this.index,
    loader: () =>
      this.socialFeedDataAccess
        .getFeed()
        .pipe(tap(() => this.IonInfiniteScroll().complete())),
  });

  readonly posts = linkedSignal<SocialPostModel[], SocialPostModel[]>({
    source: () => this.postsResource.value() ?? [],
    computation: (newPosts, posts) => [...(posts?.value ?? []), ...newPosts],
  });

  readonly trackById = trackById;

  loadPosts(): void {
    this.index.update((index) => index + 1);
  }
}
