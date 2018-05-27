import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GlobalsService } from 'app/services/globals.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { LocalStorage, LocalStorageService } from 'ngx-store';


@Component({
  selector: 'app-inputtable',
  template: `

    <mat-expansion-panel
      [expanded]="!hide"
      (opened)="hide=false"
      (closed)="hide=true">

      <mat-expansion-panel-header>
        <mat-panel-title>
          <h1>Creating</h1>
        </mat-panel-title>
      </mat-expansion-panel-header>

        <!-- Generate Form -->
        <div class="genform">
          <span>Largest number of either rounds or tables: </span>
          <mat-slider #roundsSlider thumbLabel color="primary" min="2" max="5" value="3" tickInterval="1"></mat-slider>

          <button type="button" (click)="onGenerate(roundsSlider.value)" mat-raised-button color="primary">
            <mat-icon>refresh</mat-icon> Generate
          </button>
        </div>

        <!-- Output table -->
        <ng-container *ngIf="roundsCount">

          <button [style.float]="'right'" (click)="toggleDisable()" mat-raised-button [color]="form.disabled ? 'primary' : 'default'">
              <mat-icon>lock_outline</mat-icon> Lock
            </button>
          <h1>Distribute Participants</h1>
          <form [formGroup]="form">
            <div class="table" [style.width]="(195*roundsCount) + 'px'">

              <div formArrayName="groups" *ngFor="let group of form.get('groups')['controls']; let i = index;" class="group {{ i%roundsCount==0 ? 'first' : '' }} {{ i%roundsCount==roundsCount-1 ? 'last' : '' }}">

                <span class="letter">{{ globals.letters[i] }}</span>
                <mat-form-field [formArrayName]="i" *ngFor="let name of group['controls']; let j = index;" [style.opacity]="form.disabled && name.value?.length<1 ? 0 : 1">
                  <input matInput placeholder="Name" maxlength="15" [tabindex]="j==0?j:-1" type="text" [formControlName]="j" (focus)="focusName($event)" (blur)="blurName($event)" (keyup.enter)="focusNext($event)" (keyup.ArrowUp)="focusUp($event)" (keyup.ArrowDown)="focusDown($event)">
                </mat-form-field>

              </div>

            </div>
          </form>

          <p>Participants in the same column will never sit at the same table.</p>
        </ng-container>

      </mat-expansion-panel>

  `,
  styleUrls: ['./inputtable.component.scss']
})
export class InputTableComponent implements OnInit {

  @Output() onGenerateTable = new EventEmitter<any>();

  @LocalStorage("hideInputTable") hide = false;

  form: FormGroup;
  roundsCount = 0;

  constructor(
    public globals: GlobalsService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.loadTable(this.localStorageService.get('table'));
  }

  makeForm() {
    this.form = this.fb.group({
      groups: this.fb.array([])
    });

    this.form.valueChanges.subscribe(() => {
      this.localStorageService.set("table",this.form.value.groups);
      this.onGenerateTable.emit(this.form.value.groups);
    });
  }

  onGenerate(rounds: any) {

    if (rounds <= this.roundsCount) {
      // regen & or decrease table
      let c = confirm("Are you sure? This will remove all data.");
      if (!c) return;

      this.localStorageService.set("table", null);
      this.roundsCount = rounds;
      this.makeForm();

      const control = <FormArray> this.form.controls['groups'];
      for (let i=0; i<rounds*rounds; i++)
        control.push( this.fb.array(['']) );

    } else {
      // enlarge table
      let c = confirm("Are you sure? This will change some participants' letter.");
      if (!c) return;
      
      let enlargement = rounds - this.roundsCount;
      let table = this.localStorageService.get("table");
      let newtable = [];
      for (let i=0; i<rounds*rounds;i++)
        if (i%rounds < this.roundsCount && table.length)
          newtable.push(table.shift());
        else
          newtable.push([""]);
        this.localStorageService.set("table", newtable);
      this.roundsCount = rounds;
      this.makeForm();
    }

  }

  loadTable(table) {
    if (table) {
      this.roundsCount = Math.sqrt(table.length);
      this.makeForm();
      
      const control = <FormArray> this.form.controls['groups'];
      for (let i=0; i<table.length; i++) 
        control.push( this.fb.array(table[i]) );

      setTimeout(() => {
        this.onGenerateTable.emit(this.form.value.groups);
      }, 10);
    }
  }

  blurName(event) {

    let arrayindex = Array.prototype.indexOf.call(this.getParent(event.target,6).children, this.getParent(event.target,5));
    const control = <FormArray> this.form.controls['groups']['controls'][arrayindex];
    let itemindex = Array.prototype.indexOf.call(this.getParent(event.target,5).children, this.getParent(event.target,4)) -1;

    // remove control if empty & there are other empty controls
    if (event.target.value == ""
      && this.getParent(event.target,5).nextElementSibling != undefined )
      control.removeAt(itemindex);
      
  }

  focusName(event) {

    let arrayindex = Array.prototype.indexOf.call(this.getParent(event.target,6).children, this.getParent(event.target,5));
    const control = <FormArray> this.form.controls['groups']['controls'][arrayindex];
    let itemindex = Array.prototype.indexOf.call(this.getParent(event.target,5).children, this.getParent(event.target,4));
    let previousSibling = this.getParent(event.target,5).children[itemindex-1];
    
    if ( itemindex > 1 && (previousSibling.querySelectorAll('input')[0].value == ""
      && itemindex == this.getParent(event.target,5).children.length -1) )
      return;

    // add new control if no empty controls
    if (event.target.value == ""
      && itemindex == this.getParent(event.target,5).children.length -1)
      control.push(new FormControl());    
  }

  focusNext(event) {
    if (event.target.value == "") return;
    let formField = this.getParent(event.target, 4);
    let nextFormField = formField.nextElementSibling;
    let nextInput = this.getFormFieldInput(nextFormField);
    nextInput.focus();
  }

  focusUp(event) {
    let formField = this.getParent(event.target, 4);
    let prevFormField = formField.previousElementSibling;
    if (prevFormField.childNodes[0].childNodes.length < 1) return;
    let prevInput = this.getFormFieldInput(prevFormField);
    prevInput.focus();
  }

  focusDown(event) {
    if (event.target.value == "") return;
    let formField = this.getParent(event.target, 4);
    let nextFormField = formField.nextElementSibling;
    let nextInput = this.getFormFieldInput(nextFormField);
    nextInput.focus();
  }

  toggleDisable() {
    if (this.form.disabled)
      this.form.enable();
    else
      this.form.disable();
  }

  private getParent(element, index: number) {
    let parent = element;
    for (let i=0; i<index; i++)
      parent = parent.parentNode;

    return parent;
  }

  private getFormFieldInput(element) {
    return element.childNodes[0].childNodes[0].childNodes[1].childNodes[1];
  }

}
