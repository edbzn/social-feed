import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SocialPostModel } from '@social-feed/social-feed-model';

@Injectable({ providedIn: 'root' })
export class SocialFeedDataAccess {
  private readonly http = inject(HttpClient);

  getFeed() {
    return this.http.get<SocialPostModel[]>('/api/feed');
  }
}
