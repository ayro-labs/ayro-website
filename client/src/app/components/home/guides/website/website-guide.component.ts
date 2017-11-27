import {Component} from '@angular/core';

@Component({
  selector: 'chz-website-guide',
  templateUrl: './website-guide.component.html',
})
export class WebsiteGuideComponent {

  public sdkVersion = process.env.JS_SDK_VERSION;

}
