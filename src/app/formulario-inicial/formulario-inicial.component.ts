import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from  "@angular/router";

@Component({
  selector: 'app-formulario-inicial',
  templateUrl: './formulario-inicial.component.html',
  styleUrls: ['./formulario-inicial.component.css']
})
export class FormularioInicialComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router){};

  ngOnInit(): void {
  }

  enviarInfo(){
    alert("Gracias por interesarte en nuestros servicios. Te contactaremos pronto.");
    this.router.navigate(['/principal']);
  }

}
