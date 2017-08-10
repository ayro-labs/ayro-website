import {Component, OnInit, ElementRef} from '@angular/core';

import {AccountService} from 'app/services/account.service';
import {AlertService} from 'app/services/alert.service';
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

  constructor(private accountService: AccountService, private alertService: AlertService, private elementRef: ElementRef) {

  }

  public ngOnInit() {
    this.accountService.getAuthenticatedAccount().subscribe((account: Account) => {
      this.fillFormFields(account);
    });
  }

  public updateName() {
    this.accountService.updateAccount({name: this.name}).subscribe((account: Account) => {
      this.fillFormFields(account);
      this.alertService.success('Account name updated with success!');
    }, () => {
      this.alertService.error('Couldn\'t update the account name, please try again later!');
    });
  }

  public updateEmail() {
    this.accountService.updateAccount({email: this.email}).subscribe((account: Account) => {
      this.fillFormFields(account);
      this.alertService.success('Account email updated with success!');
    }, () => {
      this.alertService.error('Couldn\'t update the account email, please try again later!');
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
