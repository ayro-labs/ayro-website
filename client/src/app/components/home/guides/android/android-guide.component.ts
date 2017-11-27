import {Component} from '@angular/core';

@Component({
  selector: 'chz-android-guide',
  templateUrl: './android-guide.component.html',
})
export class AndroidGuideComponent {

  public sdkVersion = process.env.ANDROID_SDK_VERSION;

}
