import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
import { User } from '../_models/user';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model :any = {};
@Input() valuesFromHome : any;
@Output() cancelRegister = new EventEmitter();
maxDate: Date;
registerForm: FormGroup;
user: User;
  constructor(private authservice: AuthService, private alertify : AlertifyService,
     private fb: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() - 365*18);
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['',Validators.required],
      knownAs:['',Validators.required],
      dateOfBirth:[null,Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword:['',[Validators.required]]
      
    },{validator: this.passwordValidatorGroup});


  }

  passwordValidatorGroup(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null: {'mismatch': true};
  }
  register() {

    if(this.registerForm.valid)
    {
      this.user = Object.assign({},this.registerForm.value);

      return this.authservice.register(this.user).subscribe(() => {this.alertify.success('Registered successfully')},
      error => {this.alertify.error(error); }, ()=> { 
        this.authservice.login(this.user).subscribe(()=>{
        this.route.navigate(['/members']);
      });} );
    }
    //console.log(this.registerForm.value);
      

  }
  cancel() {
      this.cancelRegister.emit(false);
  }
}
