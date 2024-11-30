import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SocialFeedDataAccess {
  private http = inject(HttpClient);

  getFeed() {
    return this.http.get<any[]>('/api/feed');
  }
}
