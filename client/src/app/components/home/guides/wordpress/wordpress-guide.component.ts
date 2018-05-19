import {Component, OnInit} from '@angular/core';

import {AppService} from 'app/services/app.service';

@Component({
  selector: 'ayro-wordpress-guide',
  templateUrl: './wordpress-guide.component.html',
})
export class WordPressGuideComponent implements OnInit {

  public pluginUrl: string;
  public pluginVersion: string;
  public loading = true;

  constructor(private appService: AppService) {

  }

  public ngOnInit(): void {
    this.appService.getConfigs().subscribe((configs) => {
      this.pluginUrl = configs.wpPluginUrl;
      this.pluginVersion = configs.wpPluginVersion;
      this.loading = false;
    });
  }
}
