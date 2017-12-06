import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GlobalsService } from 'app/services/globals.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { LocalStorageService } from 'ngx-store';


@Component({
  selector: 'app-inputtable',
  template: `

    <!-- Generate Form -->
    <div class="genform">
      <h1>Generate new</h1>
      <span>Number of rounds: </span>
      <mat-slider #roundsSlider thumbLabel color="primary" min="2" max="7" value="3" tickInterval="1"></mat-slider>

      <button (click)="onGenerate(roundsSlider.value)" mat-raised-button color="primary">
        <mat-icon>refresh</mat-icon> Generate
      </button>
    </div>

    <!-- Output table -->
    <ng-container *ngIf="roundsCount">

      <button [style.float]="'right'" (click)="toggleDisable()" mat-raised-button [color]="form.disabled ? 'primary' : 'default'">
          <mat-icon>lock_outline</mat-icon> Lock
        </button>
      <h1>Distributing Participants</h1>
      <form [formGroup]="form">
        <div class="table" [style.width]="(195*roundsCount) + 'px'">

          <div formArrayName="groups" *ngFor="let group of form.get('groups')['controls']; let i = index;" class="group {{ i%roundsCount==0 ? 'first' : '' }} {{ i%roundsCount==roundsCount-1 ? 'last' : '' }}">

            <span class="letter">{{ globals.letters[i] }}</span>
            <mat-form-field [formArrayName]="i" *ngFor="let name of group['controls']; let j = index;">
              <input matInput placeholder="Name" type="text" [formControlName]="j" (focus)="focusName($event)" (blur)="blurName($event)">
            </mat-form-field>

          </div>

        </div>
      </form>

      <p>Participants with letters under each other (same column) will never sit at the same table.</p>
    </ng-container>

  `,
  styles: [`

    .genform {
      margin-bottom: 20px;
    }

    mat-slider {
      width: 200px;
    }

    button {
      margin: 0 10px;
    }

    form {
      overflow-x: auto;
    }

    .table {
      margin: 30px auto;
    }

    .group {
      position: relative;
      display: inline-block;
      min-height: 100px;
      vertical-align: top;
      padding: 10px 20px;
    }

    .group.first {
      clear: left;
    }

    .group:not(.first) {
      border-left: 1px solid black;
    }

    .letter {
      font-size: 80px;
      top: 50px;
      right: 30px;
      position: absolute;
      opacity: 0.075;
      text-align: center;
      -webkit-user-select: none;  
      -moz-user-select: none;    
      -ms-user-select: none;      
      user-select: none;
    }

    mat-form-field {
      display: block;
      width: 150px;
    }

    :host ::ng-deep .mat-form-field-can-float.mat-form-field-should-float .mat-form-field-placeholder {
      display: none;
    }

    :host ::ng-deep .mat-form-field-underline {
      display: none;
    }

    :host ::ng-deep .mat-form-field-infix {
      border-top: none;
      padding: 0.2em 0;
    }

    p {
      text-align: center;
    }

  `]
})
export class InputTableComponent implements OnInit {

  @Output() onGenerateTable = new EventEmitter<any>();

  form: FormGroup;
  roundsCount = 0;

  constructor(
    public globals: GlobalsService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.form = this.fb.group({
      groups: this.fb.array([])
    });

    let table = this.localStorageService.get('table');
    if (table) {
      this.roundsCount = Math.sqrt(table.length);
      const control = <FormArray> this.form.controls['groups'];
      for (let i=0; i<table.length; i++) 
        control.push( this.fb.array(table[i]) );

      setTimeout(() => {
        this.onGenerateTable.emit(this.form.value.groups);
      }, 10);
    }

    this.form.valueChanges.subscribe(() => {
      this.localStorageService.set("table",this.form.value.groups);
      this.onGenerateTable.emit(this.form.value.groups);
    });
  }

  onGenerate(rounds: any) {
    if (this.form.dirty) {
      let c = confirm("Dit zal alle namen verwijderen");
      if (!c) return;
    }

    this.localStorageService.set("table", null);
    this.roundsCount = rounds;
    this.makeForm();

    const control = <FormArray> this.form.controls['groups'];
    for (let i=0; i<rounds*rounds; i++)
      control.push( this.fb.array(['']) );

  }

  blurName(event) {

    let arrayindex = Array.prototype.indexOf.call(event.path[6].children, event.path[5]);
    const control = <FormArray> this.form.controls['groups']['controls'][arrayindex];
    let itemindex = Array.prototype.indexOf.call(event.path[5].children, event.path[4]) -1;

    // remove control if empty & there are other empty controls
    if (event.target.value == ""
      && event.path[5].children[event.path[5].children.length-1].value != ""
      && event.path[5].children.length > 2 )
      control.removeAt(itemindex);
      
  }

  focusName(event) {
    let arrayindex = Array.prototype.indexOf.call(event.path[6].children, event.path[5]);
    const control = <FormArray> this.form.controls['groups']['controls'][arrayindex];
    let itemindex = Array.prototype.indexOf.call(event.path[5].children, event.path[4]);
    let previousSibling = event.path[5].children[itemindex-1];
    
    if ( itemindex > 1 && (previousSibling.querySelectorAll('input')[0].value == ""
      && itemindex == event.path[5].children.length -1) )
      return;

    // add new control if no empty controls
    if (event.target.value == ""
      && itemindex == event.path[5].children.length -1)
      control.push(new FormControl());
    
  }

  toggleDisable() {
    if (this.form.disabled)
      this.form.enable();
    else
      this.form.disable();
  }

}
