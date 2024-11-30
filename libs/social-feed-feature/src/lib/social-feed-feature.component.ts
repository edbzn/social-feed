import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { FeedItemComponent } from '@social-feed/social-feed-ui';
import { SocialFeedDataAccess } from '@social-feed/social-feed-data-access';

@Component({
  selector: 'lib-social-feed',
  standalone: true,
  imports: [
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    ScrollingModule,
    FeedItemComponent,
  ],
  template: `
    <ion-content class="ion-padding" scroll-y="false">
      <cdk-virtual-scroll-viewport
        itemSize="450"
        minBufferPx="1500"
        maxBufferPx="3000"
        class="ion-content-scroll-host"
      >
        <lib-social-post
          *cdkVirtualFor="let post of posts; let i = index; trackBy: trackById"
          [title]="post.title"
          [subtitle]="post.subtitle"
          [content]="post.content"
          [image]="post.image"
          [likes]="post.likes"
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
export default class SocialFeedFeatureComponent {
  private socialFeedDataAccess = inject(SocialFeedDataAccess);
  posts: any[] = [];

  trackById = (_idx: number, item: { id: number }) => item.id;

  constructor() {
    this.loadPosts();
  }

  loadPosts(e?: InfiniteScrollCustomEvent) {
    this.socialFeedDataAccess.getFeed().subscribe((newPosts) => {
      this.posts = [...this.posts, ...newPosts];
      e?.target.complete();
    });
  }
}
