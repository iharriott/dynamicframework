import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => PasswordInputComponent),
      multi: true
    }  
  ]
})
export class PasswordInputComponent implements ControlValueAccessor {

    @Input()
    public parentForm!: FormGroup;
  
    @Input()
    public fieldName!: string;
  
     @Input()
    public label!: string;
  
    public value!: string;
    public changed!: (value: string) => void;
    public touched!: () => void;
    public isDisabled!: boolean;
  
    constructor() { }
  
    get formField(): FormControl {
      return this.parentForm?.get(this.fieldName) as FormControl;
    }
  
    writeValue(value: string): void {
      this.value = value;
    }
  
    public onChange (event: Event): void {
      const value: string = (<HTMLInputElement>event.target).value;
      this.changed(value);
    }
    registerOnChange(fn: any): void {
      this.changed = fn;
    }
    registerOnTouched(fn: any): void {
      this.touched = fn;
    }
  
    public setDisabledState(isdisabled: boolean): void {
      this.isDisabled = isdisabled;
    }
  
}
