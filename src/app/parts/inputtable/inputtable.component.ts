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

          <button [style.float]="'right'" (click)="toggleDisable()" mat-raised-button [color]="(form.disabled ? 'primary' : 'default')">
            <mat-icon>lock_outline</mat-icon> Lock
          </button>
          <button [style.float]="'right'" (click)="fix()" mat-raised-button color="default">
            <mat-icon>refresh</mat-icon> Fix
          </button>

          <h1>Distribute Participants</h1>
          <form [formGroup]="form">
            <div class="table" [style.width]="(195*roundsCount) + 'px'">

              <div 
                formArrayName="groups"
                *ngFor="let group of form.get('groups')['controls']; let i = index;"
                class="group {{ i%roundsCount==0 ? 'first' : '' }} {{ i%roundsCount==roundsCount-1 ? 'last' : '' }}">

                <span class="letter">{{ globals.letters[i] }}</span>

                <div [formArrayName]="i"
                  *ngFor="let person of group['controls']; let j = index;"
                  [style.opacity]="(form.disabled && person.value?.name.length<1 ? 0 : 1)">

                  <div [formGroupName]="j">

                    <mat-form-field>
                      <input matInput type="text" placeholder="Name" maxlength="15"
                        formControlName="name"
                        [tabindex]="(j==0?j:-1)"
                        (focus)="focusName($event)"
                        (blur)="blurName($event)"
                        (keyup.enter)="focusNext($event)"
                        (keyup.ArrowUp)="focusUp($event)"
                        (keyup.ArrowDown)="focusDown($event)">
                    </mat-form-field>

                    <div formGroupName="data" *ngIf="person.value?.name">
                      <input type="color" formControlName="color" tabindex="-1">
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </form>

          <p>Participants with letters in the same column will never sit at the same table.</p>
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
  sub;

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
  }

  subscribeForm() {
    if (this.sub) this.sub.unsubscribe();

    this.sub = this.form.valueChanges.subscribe(() => {
      this.localStorageService.set("table", this.form.value.groups);
      this.onGenerateTable.emit(this.form.value.groups);
    });
  }

  onGenerate(rounds: any) {

    if (rounds > this.roundsCount && this.roundsCount > 0) {

      // enlarge table
      let c = confirm("Are you sure? This will change some participants' letter.");
      if (!c) return;

      if (this.sub) this.sub.unsubscribe();

      let enlargement = rounds*rounds - this.roundsCount*this.roundsCount;
      const control = <FormArray> this.form.controls['groups'];
      for (let i=0; i<enlargement; i++)
        control.push( this.fb.array([this.fb.group({name: "", data: this.fb.group({color: ""})})]) );

      this.roundsCount = rounds;

    } else {
      
      // regen & or decrease table
      if (this.roundsCount > 0) {
        let c = confirm("Are you sure? This will remove all data.");
        if (!c) return;
      }

      this.localStorageService.set("table", null);
      this.roundsCount = rounds;
      this.makeForm();

      const control = <FormArray> this.form.controls['groups'];
      for (let i=0; i<rounds*rounds; i++)
        control.push( this.fb.array([this.fb.group({name: "", data: this.fb.group({color: ""})})]) );

    }

    this.subscribeForm();
    this.localStorageService.set("table", this.form.value.groups);
    this.onGenerateTable.emit(this.form.value.groups);

  }

  loadTable(table) {
    if (table) {
      this.roundsCount = Math.sqrt(table.length);
      this.makeForm();
      
      const control = <FormArray> this.form.controls['groups'];
      for (let i=0; i<table.length; i++) {
        let arr = this.fb.array([]);
        for (let j=0; j<table[i].length; j++) {
          let group = this.fb.group({name: table[i][j].name, data: this.fb.group({color: table[i][j].data.color})});
          arr.push(group);
        }
        control.push(arr);
      }

      setTimeout(() => {
        this.subscribeForm();
        this.onGenerateTable.emit(this.form.value.groups);
      }, 10);
    }
  }

  blurName(event) {

    let arrayindex = Array.prototype.indexOf.call(this.getParent(event.target,8).children, this.getParent(event.target,7));
    const control = <FormArray> this.form.controls['groups']['controls'][arrayindex];
    let itemindex = Array.prototype.indexOf.call(this.getParent(event.target,7).children, this.getParent(event.target,6)) -1;

    // remove control if empty & there are other empty controls
    if (event.target.value == ""
      && this.getParent(event.target,7).nextElementSibling != undefined )
      control.removeAt(itemindex);
      
  }

  focusName(event) {

    let arrayindex = Array.prototype.indexOf.call(this.getParent(event.target,8).children, this.getParent(event.target,7));
    const control = <FormArray> this.form.controls['groups']['controls'][arrayindex];
    let itemindex = Array.prototype.indexOf.call(this.getParent(event.target,7).children, this.getParent(event.target,6));
    let previousSibling = this.getParent(event.target,7).children[itemindex-1];
    
    if ( itemindex > 1 && (previousSibling.querySelectorAll('input')[0].value == ""
      && itemindex == this.getParent(event.target,7).children.length -1) )
      return;

    // add new control if no empty controls
    if (event.target.value == ""
      && itemindex == this.getParent(event.target,7).children.length -1)
      control.push( this.fb.group({name: "", data: this.fb.group({color: ""})}) );
  }

  focusNext(event) {
    this.focusDown(event);
  }

  focusUp(event) {
    let formField = this.getParent(event.target, 6);
    let prevFormField = formField.previousElementSibling;
    let prevInput = this.getFormFieldInput(prevFormField);
    if (!prevInput) return;
    prevInput.focus();
  }

  focusDown(event) {
    if (event.target.value == "") return;
    let formField = this.getParent(event.target, 6);
    let nextFormField = formField.nextElementSibling;
    let nextInput = this.getFormFieldInput(nextFormField);
    if (!nextInput) return;
    nextInput.focus();
  }

  toggleDisable() {
    if (this.form.disabled)
      this.form.enable();
    else
      this.form.disable();
  }

  fix() {

    let groups = this.form.controls.groups;
    for (let letter in groups['controls']) {
      let persons = <FormArray> groups.get(letter);
      let list = persons['controls'];
      
      for (let i = 0; i < list.length; i++) {
        let person = persons.get(i.toString());
        
        // if persons in middle have no value
        if (!person.value.name && i < list.length-1) {
          persons.removeAt(i);
        }

        // if last person has a value
        if (i == list.length - 1 && person.value.name) {
          persons.push(this.fb.group({name: "", data: this.fb.group({color: ""})}));
        }
        
      } 
      
    }
  }

  private getParent(element, index: number) {
    let parent = element;
    for (let i=0; i<index; i++)
      parent = parent.parentNode;

    return parent;
  }

  private getFormFieldInput(element) {
    return element.querySelector("input[type=text]");
  }

}
