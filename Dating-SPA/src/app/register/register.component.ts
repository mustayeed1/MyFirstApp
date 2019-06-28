import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model :any = {};
@Input() valuesFromHome : any;
@Output() cancelRegister = new EventEmitter();
  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  register() {
      return this.authservice.register(this.model).subscribe(() => {},
      error => {console.log('Error in registration'); });

  }
  cancel() {
      this.cancelRegister.emit(false);
  }
}
