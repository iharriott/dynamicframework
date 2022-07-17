
import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as R from 'ramda';
import ProductDefinitionJson from '../../../assets/product.json';
import { ActivatedRoute } from '@angular/router';
//import ProductDefinitionJson from '../../../assets/product-entities.json';
import PeopleJson from '../../../assets/person.json';


export interface Options{
  label?: string;
  placeholder?: string;
  required?: boolean;
  children?: Array<FormControlObject>
}

export interface FormControlObject{
  key: string;
  type: string;
  options: Options;
}

@Component({
  selector: 'app-product-definition',
  templateUrl: './product-definition.component.html',
  styleUrls: ['./product-definition.component.css']
})
export class ProductDefinitionComponent implements OnInit {


  title = 'dynamic-product-definition';

  myForm!: FormGroup;
  productDefinitionForm : any = ProductDefinitionJson;
  //productDefinitionForm : any = PeopleJson;
  jsonOutput = "Welcome home son from Austin";
  showJsonSubject$ = new BehaviorSubject<string>(this.jsonOutput);
  updateJson$ = this.showJsonSubject$.asObservable();
  myControl: AbstractControl<any, any>;
  view: string;
  
  range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    
  selectedValue: string;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute) { 
    this.myForm = this.fb.group({});
     console.log(`simple form: ${this.productDefinitionForm}`);
    // debugger;

     // Make the api call
     this.getView(this.view);

     this.createControls(this.productDefinitionForm);
  //  const arr = this.getFieldsArray('Entities',0,'Fields');
  //  const arr2 = <FormGroup>this.getEntitiesArray('Entities').controls[0].get('Fields');
   
   }

   ngOnInit(): void {
    this.view = this.route.snapshot.data['view'];
    console.log(`view ${this.view}`);


    //debugger;
   // this.myControl = this.getFormControlBykey('Fields');
  //const mynewControl =  this.logKeyValueParis(this.myForm, 'Validations');
 // console.log(`mynewControl ${mynewControl}`);
    //const val = this.getValidationArray('Entities',0,'Fields', 0, 'Validations')
    //const val2 = this.getValidValuesArray('Entities',0,'Fields', 0, 'Validations', 0, 'ValidValues');
    this.updateJson(this.myForm.value);
    
    this.updateJson$.subscribe(value => {
      this.jsonOutput = value;
    });

    console.log(this.myForm.value);
  }

  getView(selection: string): string {
    switch(selection){
      case "Product": {
        //this.productDefinitionForm = ProductDefinitionJson;
        break;
      }
      case "people": {
         this.productDefinitionForm = PeopleJson;
        break;
      }
    }

    return null
  }
  
  getArray = R.curry((key, control) => {
   if (control.key === key){
    return control;
   }

  });

  logKeyValueParis(group: FormGroup,searchKey?: string) {
    debugger;
    let formArray;
   formArray = Object.keys(group.controls).forEach((key: string) =>{
      const abstractControl =  group.get(key);
      if(abstractControl instanceof FormArray){
        
        console.log(`key = ${key} value= ${abstractControl.value} searchkey = ${searchKey}`);
        if (key === searchKey){
          console.log(`found search key ${key}`);
          return abstractControl.value;
        }
        abstractControl.controls.forEach(control => {       
      if (control instanceof FormGroup){  
        this.logKeyValueParis(control,searchKey)
        }else if (control instanceof FormArray){
          
          console.log(`key = ${key} value= ${control.value} searchkey = ${searchKey}`);
          if (key === searchKey){
            console.log(`found search key ${key}`);
            return group.value;
          }
          control.controls.forEach(control2 => {
          if(control2 instanceof FormGroup){
            this.logKeyValueParis(control2,searchKey)
          }else{
            console.log(`key = ${key} value= ${control2.value}`);
          }
          })
        }
        else{
        console.log(`key = ${key} value= ${control.value}`)
      }
        });
      } else {
        if (abstractControl instanceof FormGroup){  
          this.logKeyValueParis(abstractControl,searchKey)
          }else{
          console.log(`key = ${key} value= ${abstractControl.value}`)
        }
      }
    });

    return formArray;
  }

  

  logKeyValueParisMap(group: FormGroup,searchKey?: string) {
    debugger;
    let formArray;
   formArray = Object.keys(group.controls).map((key: string) =>{
      const abstractControl =  group.get(key);
      if(abstractControl instanceof FormArray){
        
        console.log(`key = ${key} value= ${abstractControl.value} searchkey = ${searchKey}`);
        
        if (key === searchKey){
          console.log(`found search key ${key}`);
          formArray = abstractControl.value;
          return  formArray;
        }
        abstractControl.controls.map(control => {       
      if (control instanceof FormGroup){  
        this.logKeyValueParis(control,searchKey)
        }else if (control instanceof FormArray){
          
          console.log(`key = ${key} value= ${control.value} searchkey = ${searchKey}`);
          if (key === searchKey){
            console.log(`found search key ${key}`);
            return control.value;
          }
          control.controls.map(control2 => {
          if(control2 instanceof FormGroup){
            this.logKeyValueParis(control2,searchKey)
          }else{
            console.log(`key = ${key} value= ${control2.value}`);
          }
          })
        }
        else{
        console.log(`key = ${key} value= ${control.value}`)
      }
        });
      } else {
        if (abstractControl instanceof FormGroup){  
          this.logKeyValueParis(abstractControl,searchKey)
          }else{
          console.log(`key = ${key} value= ${abstractControl.value}`)
        }
      }
    }).filter((value) => {return value != null || undefined});

    return formArray;
  }
  
  // iterateObject(obj: any){
  // for (prop in obj){
  //   if (typeof(obj[prop]) === "object"){
  //     this.iterateObject(obj[prop]);
  //   }else{
  //    if (prop ==='name'){
  //     console.log(` ${prop}`)
  //    }

  //   }
  // }
  // }

  getFormControlBykey(searchKey: string, form?: AbstractControl<any, any>, ) : AbstractControl<any, any>
  {
    debugger;
    let control;
    let fb: AbstractControl<any, any> = null;
    if (form && form instanceof FormArray){
      control = <FormArray>form.get(searchKey);
      control = control
    }
    
    if (!form) {
      control = this.myForm;
      searchKey = 'Entities';
    }

    Object.keys(control.controls).forEach((key: string) => {
     if (key === searchKey){
      console.log(`key ${key} searchkey ${searchKey}`);
      fb = this.myForm.controls[key];
      if (fb instanceof FormArray){
        this.getFormControlBykey(key,fb);
      }
      console.log(this.myForm.controls[key]);
     }
    })
    return fb;
  }

  updateJson(jsonString: string){
    //debugger;
    const json = JSON.stringify(jsonString, null, 2);
    this.showJsonSubject$.next(json);
  }
  
  
    ngOnChanges(changes: SimpleChanges): void {
      debugger;
      this.updateJson$.subscribe(value => {
        this.jsonOutput = value;
      });
    }
  
    onCategoryChange(event: any){
      //this.myForm.get('mySelectControl').valueChanges.subscribe(value => { })
      //debugger;
    console.log(event);
    this.updateJson(this.myForm.value);
    this.updateJson$.subscribe(value => {
      this.jsonOutput = value;
    });
    }
  
   addFields(parentKey: string,parentIdx: number,childkey: string, options: any[]){
    console.log(`parentkey=${parentKey} parentIdx= ${parentIdx} childkey=${childkey} `);
    console.log(options);
    let control =  this.getFieldsArray(parentKey,parentIdx,childkey);
      const oneGroup = new FormGroup({});
  
      options.map((child) => {
      if(child.type === 'array'){
              oneGroup.addControl(child.key, new FormArray([]));
        }else{
        oneGroup.addControl(child.key, new FormControl());
        }
       });
      if(control){
          control.push(oneGroup);
    }
  
    this.updateJson(this.myForm.value);
    console.log(this.myForm);
      
    }
  
    addValidations(parentKey: string,parentIdx: number,fieldkey: string, fieldIdx: number,validationKey: string,  options: any[]){
    debugger;
    console.log(`parentkey=${parentKey} parentIdx= ${parentIdx} childkey=${fieldkey} fieldIdx ${fieldIdx} validationKey ${validationKey}`);
    console.log(options);
    let control =  this.getValidationArray(parentKey,parentIdx,fieldkey, fieldIdx,validationKey);
      const oneGroup = new FormGroup({});
  
      options.map((child) => {
      if(child.type === 'array'){
              oneGroup.addControl(child.key, new FormArray([]));
        }else{
        oneGroup.addControl(child.key, new FormControl());
        }
       });
      if(control){
          control.push(oneGroup);
    }
  
    this.updateJson(this.myForm.value);
    console.log(this.myForm); 
    }
  
    addValues(parentKey: string,parentIdx: number,fieldkey: string, fieldIdx: number,validationKey: string, validationIdx: number, valueKey: string, options: any[]){
    console.log(`parentkey=${parentKey} parentIdx= ${parentIdx} childkey=${fieldkey} `);
    console.log(options);
    let control =  this.getValidValuesArray(parentKey,parentIdx,fieldkey, fieldIdx,validationKey,validationIdx, valueKey);
      const oneGroup = new FormGroup({});
  
      options.map((child) => {
      if(child.type === 'array'){
              oneGroup.addControl(child.key, new FormArray([]));
        }else{
        oneGroup.addControl(child.key, new FormControl());
        }
       });
      if(control){
          control.push(oneGroup);
    }
  
    this.updateJson(this.myForm.value);
    console.log(this.myForm); 
    }
  
    removeValidations(parentKey: string,parentIdx: number,fieldkey: string, fieldIdx: number,validationKey: string, removeIdx: number){
    let control =  this.getValidationArray(parentKey,parentIdx,fieldkey, fieldIdx,validationKey);
    if (control.length > 1){
      control.removeAt(removeIdx);
      this.updateJson(this.myForm.value);
    }	
    }
  
    removeValues(parentKey: string,parentIdx: number,fieldkey: string, fieldIdx: number,validationKey: string, validationIdx: number, valueKey: string, removeIdx: number){
    let control =  this.getValidValuesArray(parentKey,parentIdx,fieldkey, fieldIdx,validationKey,validationIdx, valueKey);
    if (control.length > 1){
      control.removeAt(removeIdx);
      this.updateJson(this.myForm.value);
    }	
    }
  
  
   createControls(controls: Array<FormControlObject>){
    for (let control of controls){
      if (control.type !== 'group' && control.type !== 'array' ){
        this. createFormControl(control);
       
      }else if (control.type == 'array'){
        this.createFormArray(control);
     }
    }
  
    console.log('my form:',  this.myForm);
  }
  
   getFieldsArray(parentKey: string,parentIdx: number,childKey: string){
    return <FormArray>this.getEntitiesArray(parentKey).controls[parentIdx].get(childKey);
    }
  
    getValidationArray(parentKey: string,parentIdx: number,childKey: string, childIdx: number, grandChildKey: string){
    //return <FormArray>this.getFormArray(parentKey).controls[parentIdx].get(childKey);	
    return <FormArray> this.getFieldsArray(parentKey,parentIdx,childKey).controls[childIdx].get(grandChildKey);
    }
  
    getValidValuesArray(parentKey: string,parentIdx: number,childKey: string, childIdx: number, grandChildKey: string, grandchildIdx: number, greatGrandKey: string){
    return <FormArray>this.getValidationArray(parentKey,parentIdx,childKey,childIdx,grandChildKey).controls[grandchildIdx].get(greatGrandKey);
    //return <FormArray>this.getFormArray(parentKey).controls[parentIdx].get(childKey);
    //return <FormArray> this.getFieldsArray(parentKey,parentIdx,childKey).controls[childIdx].get(grandChildKey);
    }
  
  
    isLastEntityElement(parentKey: string, childIdx: number){
    const length = this.getEntitiesArray(parentKey).controls.length - 1;
    return childIdx === length
    }
  
  //   isLastValueElement(parentKey: string,parentIdx: number,childKey: string, childIdx: number, grandChildKey: string, grandchildIdx: number, greatGrandKey: string){
  // 	const length = this.getValidValuesArray(parentKey,parentIdx,childKey,childIdx,grandChildKey,grandchildIdx,greatGrandKey).controls.length - 1;
  // 	return childIdx === length
  //   }
  
    getEntitiesArray(key: string){
      return <FormArray>this.myForm.controls[key];
    }
  
    createFormControl(control: FormControlObject){
      const newFormControl = new FormControl();
  
      if (control.options.required){
        newFormControl.setValidators(Validators.required);
      }
  
      this.myForm.addControl(control.key, newFormControl);
    }
  
    createFormArray(control: FormControlObject,formGroup?: FormGroup){
      const newArray = new FormArray([]);
      const oneGroup = new FormGroup({});
      let type;
      let childkey;
      let childObj;
  
         if (control){
      control.options?.children?.map(child => {
        if (child.type == "array"){
        //debugger;
        type = child.type;
        childkey = child.key;
        childObj = child;
        console.log(`child type`);
        console.log(child);
        console.log("calling recursive");
        console.log(child);
        
        if (child.type !== "array"){
          return; 
        }
        this.createFormArray(child,oneGroup);
        }
        oneGroup.addControl(child.key, new FormControl());
        });
       }
      
      newArray.push(oneGroup);
      if (formGroup){
      formGroup.addControl(control.key, newArray);
  
      }else{
      this.myForm.addControl(control.key, newArray);
      console.log(this.myForm);
      }
    
    }
  
    async submitForm(){
      alert(JSON.stringify(this.myForm.value));
      // debugger;
      // const alert = await this.alertCtrl.create({
      //   header: "Your Form",
      //   message: JSON.stringify(this.myForm.value),
      //   buttons: ['OK']
      // });
    
      // await alert.present();
      }
    
      addArrayGroup(arrayName: string, arrayGroupSchema: any[]){
      const control =this.getEntitiesArray(arrayName);
      const oneGroup = new FormGroup({});
    
      arrayGroupSchema.map((child) => {
       
        if(child.type === 'array'){
              oneGroup.addControl(child.key, new FormArray([]));
        }else{
        oneGroup.addControl(child.key, new FormControl());
        }
       
       });
    
       control.push(oneGroup);
       this.updateJson(this.myForm.value);
       this.updateJson$.subscribe(value => {
        this.jsonOutput = value;
      });
       console.log('my form:',  this.myForm);
      }
  
      removeArrayGroup(arrayName: string, index: number){
      const control = this.getEntitiesArray(arrayName);
      if (control.length > 1){
      control.removeAt(index);
      this.updateJson(this.myForm.value);
      }
      }
      
      removeFields(parentKey: string,parentIdx: number,childkey: string, childIdx: number){
      let control =  this.getFieldsArray(parentKey,parentIdx,childkey);
      if (control.length > 1){
        control.removeAt(childIdx);
        this.updateJson(this.myForm.value);
      }	
      }
  

}
