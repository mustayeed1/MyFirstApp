import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  values: any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getValues();
  }
getValues(){
  this.values = this.http.get('http://localhost:5000/api/values').subscribe(observable => {
    this.values = observable;
  }, error => { console.log(error) }
  ) ;
}
}
