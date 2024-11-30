import { Component, input } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { SocialPostModel } from '@social-feed/social-feed-model';

@Component({
  selector: 'lib-social-post',
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
  ],
  template: `
    @let p = post();

    <ion-card>
      <img loading="lazy" [src]="p.image" [alt]="p.title" />
      <ion-card-header>
        <ion-card-title>{{ p.title }}</ion-card-title>
        <ion-card-subtitle>{{ p.subtitle }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        {{ p.content }}
        <div class="ion-margin-top">
          <ion-icon name="heart"></ion-icon> {{ p.likes }}
        </div>
      </ion-card-content>
    </ion-card>
  `,
})
export class SocialPostComponent {
  readonly post = input.required<SocialPostModel>();

  constructor() {
    addIcons({ heart });
  }
}
