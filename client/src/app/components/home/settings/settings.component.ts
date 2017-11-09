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
  public loading: boolean = true;

  constructor(private accountService: AccountService, private alertService: AlertService, private eventService: EventService, private elementRef: ElementRef) {

  }

  public ngOnInit() {
    this.accountService.getAuthenticatedAccount().subscribe((account) => {
      this.fillFormFields(account);
      this.loading = false;
    });
  }

  public update() {
    this.accountService.updateAccount({name: this.name, email: this.email}).subscribe((account) => {
      this.fillFormFields(account);
      this.eventService.publish('account_name_changed', account.name);
      this.alertService.success('Conta atualizada com sucesso!');
    }, () => {
      this.alertService.error('Não foi possível atualizar a conta, por favor tente novamente mais tarde!');
    });
  }

  public updateLogo(event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.logo = e.target.result;
      const logoElement: HTMLInputElement = this.elementRef.nativeElement.querySelector('#logo-input');
      if (logoElement && logoElement.files && logoElement.files.length > 0) {
        this.accountService.updateAccountLogo(logoElement.files.item(0)).subscribe((account) => {
          this.fillFormFields(account);
          this.eventService.publish('account_logo_changed', account.logo);
          this.alertService.success('Logo da conta atualizado com sucesso!');
        }, () => {
          this.alertService.error('Não foi possível atualizar o logo da conta, por favor tente novamente mais tarde!');
        });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  private fillFormFields(account: Account) {
    this.name = account.name;
    this.email = account.email;
    this.logo = account.getLogoUrl();
  }
}
