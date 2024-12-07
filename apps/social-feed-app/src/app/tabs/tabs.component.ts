import { Component, inject } from '@angular/core';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, earthOutline, settingsOutline } from 'ionicons/icons';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SocialPostService } from '@social-feed/social-post-feature';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="feed" href="/feed">
          <ion-icon name="earth-outline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button (click)="takePictureAndNavigate()">
          <ion-icon name="add-circle-outline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button disabled>
          <ion-icon name="settings-outline"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon],
})
export class TabsComponent {
  private readonly socialMediaService = inject(SocialPostService);
  private readonly router = inject(Router);

  constructor() {
    addIcons({ earthOutline, addCircleOutline, settingsOutline });
  }

  async takePictureAndNavigate() {
    const picture = await this.socialMediaService.takePicture();

    if (picture) {
      this.router.navigate(['post', 'new'], { queryParams: { picture } });
    }
  }
}
