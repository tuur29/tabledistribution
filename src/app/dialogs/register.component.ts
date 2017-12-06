import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { GlobalsService } from 'app/services/globals.service';

@Component({
  selector: 'app-register',
  template: `

    <h1 mat-dialog-title>Registreer</h1>
    <form [formGroup]="form" (ngSubmit)='onSubmit(form.value)'>

      <mat-form-field>
        <input type="text" matInput placeholder="Naam" required formControlName="name">
        <mat-error *ngIf="form.hasError('required', ['name']) && form.get('name').touched">
          Gelieve een naam in te vullen.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <input type="email" matInput placeholder="E-mailadres" required formControlName="email">
        <mat-error *ngIf="form.hasError('email', ['email']) && form.get('email').touched">
          Gelieve een geldig e-mailadres in te vullen.
        </mat-error>
        <mat-error *ngIf="form.hasError('inuse', ['email'])">
          Dit e-mailadres is al in gebruik.
        </mat-error>
      </mat-form-field>

      <ng-container formGroupName="passwordGroup">

        <mat-form-field>
          <input type="password" matInput placeholder="Wachtwoord" required formControlName="password">
          <mat-error *ngIf="form.controls.passwordGroup.hasError('required', ['password']) && form.controls.passwordGroup.get('password').touched">
            Gelieve een wachtwoord in te vullen.
          </mat-error>

          <mat-error *ngIf="form.controls.passwordGroup.hasError('minlength', ['password']) && form.controls.passwordGroup.get('password').touched">
            Het wachtwoord moet minstens 10 tekens lang zijn
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <input type="password" matInput placeholder="Herhaal wachtwoord" required formControlName="password2">

          <mat-hint class="color-warn" *ngIf="form.controls.passwordGroup.hasError('different') && form.controls.passwordGroup.touched">
            De wachtwoorden komen niet overeen.
          </mat-hint>
        </mat-form-field>


      </ng-container>

      <div mat-dialog-actions>
        <button type="submit" [disabled]='!form.valid' mat-raised-button color="primary">
          <mat-icon>send</mat-icon> Verstuur
        </button>

        <span class="spacer"></span>

        <button mat-button mat-dialog-close color="warn">SLUITEN</button>
      </div>

    </form>

  `,
  styles: [`

    .spacer {
      width: 10px;
    }

    form button mat-icon {
      font-size: 22px;
      margin-right: 5px;
    }

    mat-form-field:not(:first-of-type) {
      display: block;
      margin-bottom: 20px;
    }

  `]
})
export class RegisterDialog implements OnInit {

  form: FormGroup;

  constructor(
    public globals: GlobalsService,
    public dialogRef: MatDialogRef<RegisterDialog>,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      passwordGroup: fb.group({
        password: ['', [Validators.required, Validators.minLength(10)]],
        password2: ['', Validators.required]
      }, { validator: this.comparePasswords })
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload($event) {
    return !this.form.dirty;
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(value => {
      if (this.form.dirty)
        this.dialogRef.disableClose = true;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(data: any) {
    this.globals.register(data.email, data.name, data.passwordGroup.password).subscribe(()=>{
      this.dialogRef.close();
    },
    (err) => {
      if (err.indexOf("E11000") > -1)
        this.form.controls.email.setErrors({ inuse: true });
      else
        alert("Er ging iets mis tijdens de registratie");
    });
  }

  private comparePasswords(control: AbstractControl): { [key: string]: any } {
    let password = control.get('password').value;
    let confirmPassword = control.get('password2').value;
    return password === confirmPassword ? null : { 'different': true };
  }

}
