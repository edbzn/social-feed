import { Component, input } from "@angular/core";

@Component({
    selector: 'social-media-feature',
    template: `
      <img [src]="picture()">
      <form>


      </form>
    `,
    standalone: true,
})
export default class SocialPostFeatureComponent {
    readonly picture = input();
}
