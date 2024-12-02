import {
  Component,
  inject,
  linkedSignal,
  signal,
  viewChild
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import {
  FixedSizeVirtualScrollStrategy,
  RxVirtualFor,
  RxVirtualScrollViewportComponent
} from '@rx-angular/template/experimental/virtual-scrolling';
import { SocialFeedDataAccess } from '@social-feed/social-feed-data-access';
import { SocialPostModel } from '@social-feed/social-feed-model';
import { SocialPostComponent } from '@social-feed/social-feed-ui';
import { tap } from 'rxjs';

@Component({
  selector: 'social-feed-feature',
  standalone: true,
  imports: [
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    SocialPostComponent,
    RxVirtualFor,
    RxVirtualScrollViewportComponent,
    FixedSizeVirtualScrollStrategy,
  ],
  template: `
    <ion-content class="ion-padding" scroll-y="false">
      <rx-virtual-scroll-viewport
        [itemSize]="545"
        class="ion-content-scroll-host"
      >
        <social-post-ui
          *rxVirtualFor="let post of posts(); trackBy: 'id'"
          [post]="post"
        />
        <ion-infinite-scroll (ionInfinite)="loadPosts()">
          <ion-infinite-scroll-content
            #infiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
          />
        </ion-infinite-scroll>
      </rx-virtual-scroll-viewport>
    </ion-content>
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

  loadPosts(): void {
    this.index.update((index) => index + 1);
    console.log('Loading more posts...');
  }
}
