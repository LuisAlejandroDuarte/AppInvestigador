import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.css']
})
export class ConvocatoriaComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  goBack()
  {
    this.route.navigate(['/menu']);
  }
}
