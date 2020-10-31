import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from  "@angular/router";
import { dbFunctions } from '../databaseAccess/dbFunc';
import { FechaEsp } from './../fecha';

@Component({
  selector: 'app-formulario-inicial',
  templateUrl: './formulario-inicial.component.html',
  styleUrls: ['./formulario-inicial.component.css']
})
export class FormularioInicialComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private dbAcc: dbFunctions){};

  ngOnInit(): void {
    (document.getElementById("divCeremonia") as HTMLBodyElement).style.display="none";
  }

  cambioCeremonia(value){
      if (value == "con"){
        (document.getElementById("divCeremonia") as HTMLBodyElement).style.display="block";
      }
      if (value == "sin"){
        (document.getElementById("divCeremonia") as HTMLBodyElement).style.display="none";
      }
  }
  async enviarInfo(){
    try{
      var mail = (document.getElementById("mail") as HTMLInputElement).value;

      var llave = this.dbAcc.getKey(mail);

      var form = document.forms.namedItem("formInicial");
      var radios = form.elements.namedItem("inlineRadioOptions") as RadioNodeList;
      var radios2 = form.elements.namedItem("inlineRadioOptions2") as RadioNodeList;
      var ceremonia = radios.value;
      var tipoCeremonia = radios2.value;

      var tipo = (document.getElementById("tipoEvento") as HTMLInputElement).value;
      var fecha = (document.getElementById("fechaEvento") as HTMLInputElement).value; 
      var ciudad = (document.getElementById("ciudad") as HTMLInputElement).value;
      var tipoLocacion = (document.getElementById("tipoLocacion") as HTMLInputElement).value;
      if (ceremonia =="Con ceremonia"){
        this.dbAcc.write('/posibles/'+llave+'_posible/tipoCeremonia',tipoCeremonia);
      }
      var numInvitados = (document.getElementById("numInvitados") as HTMLInputElement).value;
      var presupuesto = (document.getElementById("presupuesto") as HTMLInputElement).value;
      var comentarios = (document.getElementById("tipoEvento") as HTMLInputElement).value;
      var nombre = (document.getElementById("nombre") as HTMLInputElement).value;
      var telefono = (document.getElementById("telefono") as HTMLInputElement).value;

      var auxFecha = new Date(fecha);
      var auxFecha2 = new Date(auxFecha.getTime() + 24*60*60*1000);
      var fechaEsp = new FechaEsp(auxFecha2); 
    

      this.dbAcc.write('/posibles/'+llave+'_posible/tipo',tipo);
      this.dbAcc.write('/posibles/'+llave+'_posible/fecha',fechaEsp.toString());
      this.dbAcc.write('/posibles/'+llave+'_posible/ciudad',ciudad);
      this.dbAcc.write('/posibles/'+llave+'_posible/tipoLocacion',tipoLocacion);
      this.dbAcc.write('/posibles/'+llave+'_posible/ceremonia',ceremonia);
      this.dbAcc.write('/posibles/'+llave+'_posible/numInvitados',numInvitados);
      this.dbAcc.write('/posibles/'+llave+'_posible/presupuesto',presupuesto);
      this.dbAcc.write('/posibles/'+llave+'_posible/comentariosIniciales',comentarios);
      this.dbAcc.write('/posibles/'+llave+'_posible/nombre',nombre);
      this.dbAcc.write('/posibles/'+llave+'_posible/telefono',telefono);
      this.dbAcc.write('/posibles/'+llave+'_posible/mail',mail);

      alert("Gracias por interesarte en nuestros servicios. Te contactaremos pronto.");
      this.router.navigate(['/principal']);
    }catch (error) {
      alert("ERROR: Contacte a un supervisor");
    }
    
  }

}
