import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { logueado } from 'src/app/entidad/usuario/entidad.usuario';
declare const $: any;
@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
    $('#iconoEspera').hide();
  }

  goBack()
  {
    this.route.navigate(['/menu']);
  }

}
