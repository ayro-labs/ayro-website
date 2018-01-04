import {Component, OnInit} from '@angular/core';

import {AppService} from 'app/services/app.service';

@Component({
  selector: 'ayro-android-guide',
  templateUrl: './android-guide.component.html',
})
export class AndroidGuideComponent implements OnInit {

  public sdkVersion: string;
  public loading: boolean = true;

  constructor(private appService: AppService) {

  }

  public ngOnInit() {
    this.appService.getConfigs().subscribe((configs) => {
      this.sdkVersion = configs.androidSdkVersion;
      this.loading = false;
    });
  }
}
