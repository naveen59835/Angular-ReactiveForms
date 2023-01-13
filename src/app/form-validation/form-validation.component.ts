import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {VERSION} from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatChipInputEvent } from '@angular/material/chips';
import { OnInit } from '@angular/core';




@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  value = 'Clear me';
  date = new FormControl(new Date());
  minDate: Date = new Date();
  maxDate:Date = new Date();

  defaultValue = { hour: 13, minute: 30 };
  times= ['00:00', '00:15', '00:30', '00:45', '01:00','01:15','01:30']
  guestList: any;

  timeChangeHandler(event: any) {}

  invalidInputHandler() {}
  profileForm:FormGroup;
  constructor (private fb: FormBuilder,private _snackBar: MatSnackBar){ 
    this.minDate.setDate(this.minDate.getDate()); 
    this.maxDate.setDate(this.maxDate.getDate()+30)
this.profileForm=this.fb.group({
  title:new FormControl('',[Validators.required, Validators.maxLength(100)]),
  timein:new FormControl('',[Validators.required]),
  start:new FormControl('',[Validators.required]),
  end:new FormControl('',[Validators.required]),
  timeout:new FormControl('',[Validators.required]),
  comments:new FormControl('',[Validators.required]),
  guests:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/)]),

 

},{Validators:[this.checkIfGuestEmailsAreValid]});
  }


  keywords = [''];
  formControl = new FormControl(['angular']);

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
  
  //   title:new FormControl(''),
  //   timein:new FormControl(''),
  //   timeout:new FormControl(''),
  //   comments:new FormControl(''),
  //   guests:new FormControl('')
  // });


  onSubmit(){
    console.log(this.profileForm.value);
    // console.log(this.campaignOne.value);
    console.log(this.profileForm.value);
  }


  openSnackBar() {
 
    this._snackBar.open('Feedback submitted successfully', 'success', {​
      duration: 5000,​
      panelClass: ['mat-toolbar', 'mat-primary']​
      })
  
  }
  

  get title(){
    return this.profileForm.get("title");
  }
  
  get timein(){
    return this.profileForm.get("timein");
  }
  
  get start(){
    return this.profileForm.get("start");
  }
  
  get end(){
    return this.profileForm.get("end");
  }
  
  get timeout(){
    return this.profileForm.get("timeout");
  }
  
  get comments(){
    return this.profileForm.get("comments");
  }
  
  get guests(){
    return this.profileForm.get("guests");
  }
  checkIfGuestEmailsAreValid(c: AbstractControl) {
    if (c.value !== '') {
      const emailString = c.value;
      const emails = emailString.split(',').map((e: string) => e.trim());
      const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const anyInvalidEmail = emails.every((e: string) => e.match(emailRegex) !== null);
      if (!anyInvalidEmail) {
        return { checkIfGuestEmailsAreValid: false }
      }
    }
    return null;
  }
  ngOnInit(): void {​
    this.profileForm.controls['guests'].valueChanges.subscribe( (guestEmails) => { this.guestList = guestEmails?.split(',');​
    });​
    }


  
  
}
  
  
