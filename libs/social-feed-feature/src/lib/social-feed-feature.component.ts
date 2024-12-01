import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { SocialFeedDataAccess } from '@social-feed/social-feed-data-access';
import { SocialPostModel } from '@social-feed/social-feed-model';
import { SocialPostComponent } from '@social-feed/social-feed-ui';

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
          *cdkVirtualFor="let post of posts(); let i = index; trackBy: trackById"
          [post]="post"
        />
        <ion-infinite-scroll (ionInfinite)="loadPosts($event)">
          <ion-infinite-scroll-content
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
export default class SocialFeedFeatureComponent implements OnInit {
  private readonly socialFeedDataAccess = inject(SocialFeedDataAccess);

  readonly posts: WritableSignal<SocialPostModel[]> = signal([]);

  readonly trackById = (_idx: number, item: { id: string }) => item.id;

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts(event?: InfiniteScrollCustomEvent): void {
    this.socialFeedDataAccess.getFeed().subscribe((newPosts) => {
      this.posts.update((posts) => [...posts, ...newPosts]);
      event?.target.complete();
    });
  }
}
