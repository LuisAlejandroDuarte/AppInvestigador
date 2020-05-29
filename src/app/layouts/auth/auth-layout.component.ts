import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent implements OnInit {
  


  constructor(private router: Router, private element: ElementRef) {
   
  }
  ngOnInit(){
  
  
  }

}
