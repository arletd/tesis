import { Component, OnInit } from '@angular/core';
import { FechaEsp } from './../fecha';
import { dbFunctions } from '../databaseAccess/dbFunc';
import { TemplateDefinitionBuilder } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-organizador',
  templateUrl: './organizador.component.html',
  styleUrls: ['./organizador.component.css']
})
export class OrganizadorComponent implements OnInit {
  
  constructor(private dbAcc: dbFunctions) { }

  posibles: boolean = false; 
  nuevoEvento;
  cli;
  
  ngOnInit(): void {
    this.verificaPosibles();
  }

  async verificaPosibles(){
    var pos =await this.dbAcc.read('posibles/');
    if(pos!=''){
      //Mostramos el panel de nuevo evento para el organizador
      this.posibles=true;
      //Localizamos el nombre de la rama que es el evento social posible (se envió un formulario)
      var obj = JSON.parse(JSON.stringify(pos));
      var ks = Object.keys(obj);
      var name = ks[0];
      pos=await this.dbAcc.read('posibles/'+name);
      //Convertimos la informacion del evento en un JSON
      var obj = JSON.parse(JSON.stringify(pos));
      this.datosNuevoEvento(obj);
      this.nuevoEvento=obj;
      this.cli=name;
    }
  }

  async datosNuevoEvento(info){
    //Datos del cliente
    (document.getElementById("nom") as HTMLSpanElement).innerText=info.nombre;
    (document.getElementById("tel") as HTMLSpanElement).innerText=info.telefono;
    (document.getElementById("mail") as HTMLSpanElement).innerText=info.mail;
    //datos del evento
    (document.getElementById("tipEv") as HTMLSpanElement).innerText=info.tipo;
    (document.getElementById("fechaEvento") as HTMLSpanElement).innerText=info.fecha;
    (document.getElementById("ciudad") as HTMLSpanElement).innerText=info.ciudad;
    (document.getElementById("tipLocacion") as HTMLSpanElement).innerText=info.tipoLocacion;
    if(info.ceremonia=="Sin ceremonia"){
      (document.getElementById("ceremoniaTipo") as HTMLSpanElement).innerText="No requiere ceremonia";
    }else{
      (document.getElementById("ceremoniaTipo") as HTMLSpanElement).innerText=info.tipoCeremonia;
    }
    (document.getElementById("invitados") as HTMLSpanElement).innerText=info.numInvitados;
    (document.getElementById("presupuesto") as HTMLSpanElement).innerText=info.presupuesto;
    (document.getElementById("comentariosI") as HTMLSpanElement).innerText=info.comentariosIniciales;
  }
  aceptarEvento(){
    alert("Aceptaste el evento");
    this.buscaCliente(this.nuevoEvento,this.cli);
  }

  async buscaCliente(info,cliente){
    var pos =await this.dbAcc.read('/usuarios/'+cliente);
    console.log(pos);
    var total;
    if(pos != ''){ //Ya existe un cliente con este usuario
      var obj = JSON.parse(JSON.stringify(pos));
      total = obj.eventos.total;
      try{
        //Se agregan los datos de un nuevo evento en la información del usuario
        this.dbAcc.write('/usuarios/'+cliente+'/eventos/'+total+1,cliente+"_"+(total+1));
        this.dbAcc.write('/usuarios/'+cliente+'/eventos/total',total+1);
        this.dbAcc.write('/usuarios/'+cliente+'/eventoActual',cliente+"_"+(total+1));
        //Actualiza numero y mail
        this.dbAcc.write('/usuarios/'+cliente+'/telefono',info.telefono);
        this.dbAcc.write('/usuarios/'+cliente+'/mail',info.mail);
      }catch (error) {
        alert("ERROR: Contacte a un supervisor");
      }
    }
    else{ //No existe el cliente
      total=0;
      try{
        //Se agregan los datos de un nuevo evento en la información del usuario
        this.dbAcc.write('/usuarios/'+cliente+'/eventos/1',cliente+"_1");
        this.dbAcc.write('/usuarios/'+cliente+'/eventos/total',"1");
        this.dbAcc.write('/usuarios/'+cliente+'/eventoActual',cliente+"_1");
        //datos de contacto
        this.dbAcc.write('/usuarios/'+cliente+'/nombre',info.nombre);
        this.dbAcc.write('/usuarios/'+cliente+'/telefono',info.telefono);
        this.dbAcc.write('/usuarios/'+cliente+'/mail',info.mail);
        this.dbAcc.write('/usuarios/'+cliente+'/tipoAcceso',"A");
      }catch (error) {
        alert("ERROR: Contacte a un supervisor");
      }
    }
    this.escribeInfoEvento(info,cliente,total);
  }

  escribeInfoEvento(info,cliente,total){
    total=total+1;
    var idEv=cliente+"_"+total;
    try{
      //Se agregan los datos del nuevo evento
      this.dbAcc.write('/eventos/'+idEv+'/tipo',info.tipo);
      this.dbAcc.write('/eventos/'+idEv+'/fecha',info.fecha);
      this.dbAcc.write('/eventos/'+idEv+'/ciudad',info.ciudad);
      this.dbAcc.write('/eventos/'+idEv+'/tipoLocacion',info.tipoLocacion);
      this.dbAcc.write('/eventos/'+idEv+'/ceremonia',info.ceremonia);
      if(info.ceremonia == "Con ceremonia"){
        this.dbAcc.write('/eventos/'+idEv+'/ceremonia',info.tipoCeremonia);
      }
      this.dbAcc.write('/eventos/'+idEv+'/numInvitados',info.numInvitados);
      this.dbAcc.write('/eventos/'+idEv+'/presupuesto',info.presupuesto);
      this.dbAcc.write('/eventos/'+idEv+'/comentariosIniciales',info.comentariosIniciales);
      this.dbAcc.delete('posibles'); //En la lógica actual solo puede haber un posible que este pendiente
      this.posibles=false;
    }catch (error) {
      alert("ERROR: Contacte a un supervisor");
    }
  }
  ultimaFecha=new Date();
  

  prueba(){
    var fechaFinal=new Date(this.ultimaFecha.getTime() + 7*24*60*60*1000);
    var fechaAux=new FechaEsp(fechaFinal);
    console.log(fechaAux);
    var detalles = (document.getElementById("detallesCeremonia1") as HTMLInputElement).value;
    (document.getElementById("detCer1") as HTMLSpanElement).innerText=detalles;
    (document.getElementById("fechaCer1prop") as HTMLSpanElement).innerText=fechaAux.toString();
  }
}
