import {Component, OnInit, ElementRef} from '@angular/core';

import {AccountService} from 'app/services/account.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';
import {Account} from 'app/models/account.model';

@Component({
  selector: 'chz-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

  public name: string;
  public email: string;
  public logo: string;
  private account: Account;

  constructor(private accountService: AccountService, private alertService: AlertService, private eventService: EventService, private elementRef: ElementRef) {

  }

  public ngOnInit() {
    this.accountService.getAuthenticatedAccount().subscribe((account: Account) => {
      this.fillFormFields(account);
    });
  }

  public update() {
    this.accountService.updateAccount({name: this.name, email: this.email}).subscribe((account: Account) => {
      this.fillFormFields(account);
      this.eventService.publish('account_name_changed', account.name);
      this.alertService.success('Account updated with success!');
    }, () => {
      this.alertService.error('Couldn\'t update the account, please try again later!');
    });
  }

  public updateLogo(event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.logo = e.target.result;
      const logoElement: HTMLInputElement = this.elementRef.nativeElement.querySelector('#logo-input');
      if (logoElement && logoElement.files && logoElement.files.length > 0) {
        this.accountService.updateAccountLogo(logoElement.files.item(0)).subscribe((account: Account) => {
          this.fillFormFields(account);
          this.eventService.publish('account_logo_changed', account.logo);
          this.alertService.success('Account logo updated with success!');
        }, () => {
          this.alertService.error('Couldn\'t update the account logo, please try again later!');
        });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  private fillFormFields(account: Account) {
    this.account = account;
    this.name = account.name;
    this.email = account.email;
    this.logo = `http://api.chatz.io/img/accounts/${account.logo}`;
  }
}
