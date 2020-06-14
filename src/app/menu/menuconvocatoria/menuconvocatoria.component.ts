import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const $: any;
@Component({
  selector: 'app-menuconvocatoria',
  templateUrl: './menuconvocatoria.component.html',
  styleUrls: ['./menuconvocatoria.component.css']
})
export class MenuConvocatoriaComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
    $('#iconoEspera').hide();
  }

  goBack()
  {
    this.route.navigate(['/menu']);
  }
}
