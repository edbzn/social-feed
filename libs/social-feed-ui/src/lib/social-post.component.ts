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
    <ion-card>
      <img loading="lazy" [src]="image()" />
      <ion-card-header>
        <ion-card-title>{{ title() }}</ion-card-title>
        <ion-card-subtitle>{{ subtitle() }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        {{ content() }}

        <div class="ion-margin-top">
          <ion-icon name="heart"></ion-icon> {{ likes() }}
        </div>
      </ion-card-content>
    </ion-card>
  `,
})
export class FeedItemComponent {
  readonly title = input.required();
  readonly subtitle = input.required();
  readonly content = input.required();
  readonly image = input.required();
  readonly likes = input.required();

  constructor() {
    addIcons({ heart });
  }
}
