import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { GlobalsService } from 'app/services/globals.service';
import { DialogsService } from '../../dialogs/dialogs.service';

@Component({
  selector: 'app-login',
  template: `

      <!-- Login form -->
      <form [formGroup]="form" (ngSubmit)='onSubmit(form.value)' *ngIf="!globals.auth.token">

        <mat-form-field>
          <input type="email" matInput placeholder="E-mailadres" required formControlName="email">
          <mat-error *ngIf="form.hasError('email', 'email') && form.get('email').touched">
            Gelieve een geldig e-mailadres in te vullen.
          </mat-error>

          <mat-hint class="color-warn" *ngIf="loginerror">
            {{ loginerror }}
          </mat-hint>
        </mat-form-field>

        <mat-form-field>
          <input type="password" matInput placeholder="Wachtwoord" required formControlName="password">
          <mat-error *ngIf="form.hasError('required', 'password') && form.get('password').touched">
            Gelieve een wachtwoord in te vullen.
          </mat-error>
          <mat-error *ngIf="form.hasError('minlength', 'password') && form.get('password').touched">
            Het wachtwoord moet minstens 10 tekens lang zijn
          </mat-error>
        </mat-form-field>

        <button type="submit" [disabled]='!form.valid' mat-raised-button color="primary">
          <mat-icon>lock_outline</mat-icon> Login
        </button>
        <button type="button" mat-raised-button (click)="dialogsService.register()">Registreer</button>
      </form>

      <!-- logged in buttons -->
      <div *ngIf="globals.auth.token">
        <button mat-raised-button color="warn" (click)="logout()">Log uit</button>
      </div>

  `,
  styles: [`

    button mat-icon {
      font-size: 22px;
      margin-right: 2px;
    }

    mat-form-field, button {
      margin: 0 10px;
    }

  `]
})
export class LoginComponent implements OnInit {

  @Input() redirect: string;

  form: FormGroup;
  loginerror = null;

  constructor(
    public globals: GlobalsService,
    public dialogsService: DialogsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.form.valueChanges.subscribe(()=>{
      this.loginerror = null;
    });
  }

  ngOnInit() {}

  onSubmit(data: any) {
    this.globals.login(data.email, data.password).subscribe(()=>{
      if (this.redirect)
        this.router.navigate([this.redirect]);
    },
    (err) => {
      setTimeout(()=>{
        this.loginerror = err.message;
      });
    });
  }

  logout() {
    this.globals.logout();
    this.router.navigate(['']);
  }

}
