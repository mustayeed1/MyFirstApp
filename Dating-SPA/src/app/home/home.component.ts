import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor(private http: HttpClient ) { }
values : any;
  ngOnInit() {
    this.getValues();
  }
  registerToggle()
  {
    this.registerMode = true;
  }

  getValues(){
    this.values = this.http.get('http://localhost:5000/api/values').subscribe(observable => {
      this.values = observable;
    }, error => { console.log(error) }
    ) ;
  }
  cancelRegisterMode(registerMode: boolean)
  {
    this.registerMode = registerMode;
  }
}
