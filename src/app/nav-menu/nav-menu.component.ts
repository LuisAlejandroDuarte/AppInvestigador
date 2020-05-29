import { Component } from '@angular/core';
import { NavMenuService } from './nav-menu.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  iniciar:boolean
  showAdmin:boolean;
  constructor( private navMenu: NavMenuService,private router:Router) {

  }

  collapse() {
    this.isExpanded = false;
  }



  ngOnInit(): void {
    this.showAdmin=false; 
    this.navMenu.change.subscribe(cambiar=>{
      this.iniciar=cambiar;
    })

    this.iniciar =(localStorage.getItem("logueado")=="0")? false:true;

    $('#iconoEspera').hide();
  }

  logueado(loguin:boolean):void {
    this.iniciar=loguin;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  onClicSalir():void {
    localStorage.setItem("logueado","0");
    localStorage.setItem("idUsuario",null);
    this.iniciar=false;
    this.router.navigateByUrl("/");
  }



}
