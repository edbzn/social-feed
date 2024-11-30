import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SocialPostModel } from '@social-feed/social-feed-model';

@Injectable({ providedIn: 'root' })
export class SocialFeedDataAccess {
  private http = inject(HttpClient);

  getFeed() {
    return this.http.get<SocialPostModel[]>('/api/feed');
  }
}
