import {Component, OnInit} from '@angular/core';

import {AccountService} from 'app/services/account.service';
import {AlertService} from 'app/services/alert.service';
import {EventService} from 'app/services/event.service';
import {Account} from 'app/models/account.model';

@Component({
  selector: 'ayro-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

  public name: string;
  public email: string;
  public logo: string;
  public loading = true;

  constructor(private accountService: AccountService, private alertService: AlertService, private eventService: EventService) {

  }

  public ngOnInit(): void {
    this.accountService.getAuthenticatedAccount().subscribe((account) => {
      this.fillFormFields(account);
      this.loading = false;
    });
  }

  public update(): void {
    this.accountService.updateAccount({name: this.name, email: this.email}).subscribe((account) => {
      this.fillFormFields(account);
      this.eventService.publish(EventService.EVENT_ACCOUNT_NAME_CHANGED, account.name);
      this.alertService.success('Conta atualizada com sucesso!');
    }, (err) => {
      this.alertService.apiError(null, err, 'Não foi possível atualizar a conta, por favor tente novamente mais tarde!');
    });
  }

  public updateLogo(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (readEvent: any) => {
      this.logo = readEvent.target.result;
      this.accountService.updateAccountLogo(file).subscribe((account) => {
        this.fillFormFields(account);
        this.eventService.publish(EventService.EVENT_ACCOUNT_LOGO_CHANGED, account.logo_url);
        this.alertService.success('Logo da conta atualizado com sucesso!');
      }, (err) => {
        this.alertService.apiError(null, err, 'Não foi possível atualizar o logo da conta, por favor tente novamente mais tarde!');
      });
    };
    reader.readAsDataURL(file);
  }

  private fillFormFields(account: Account): void {
    this.name = account.name;
    this.email = account.email;
    this.logo = account.logo_url;
  }
}
