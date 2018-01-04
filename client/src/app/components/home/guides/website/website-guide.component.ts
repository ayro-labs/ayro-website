import {Component, OnInit} from '@angular/core';

import {AppService} from 'app/services/app.service';

@Component({
  selector: 'ayro-website-guide',
  templateUrl: './website-guide.component.html',
})
export class WebsiteGuideComponent implements OnInit {

  public sdkUrl: string;
  public sdkVersion: string;
  public loading: boolean = true;

  constructor(private appService: AppService) {

  }

  public ngOnInit() {
    this.appService.getConfigs().subscribe((configs) => {
      this.sdkUrl = configs.jsSdkUrl;
      this.sdkVersion = configs.jsSdkVersion;
      this.loading = false;
    });
  }
}
