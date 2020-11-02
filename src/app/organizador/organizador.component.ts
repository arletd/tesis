import { Component, OnInit } from '@angular/core';
import { FechaEsp } from './../fecha';
import { dbFunctions } from '../databaseAccess/dbFunc';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from './../storage.service';

@Component({
  selector: 'app-organizador',
  templateUrl: './organizador.component.html',
  styleUrls: ['./organizador.component.css']
})
export class OrganizadorComponent implements OnInit {
  
  constructor(private route: ActivatedRoute,private dbAcc: dbFunctions, private sts: StorageService) { }

  posibles: boolean = false; 
  nuevoEvento;
  cli;
  userKey;
  urls;
  ceremoniaBand=false;
  actual;
  arbol;
  
  fechaAux=new Date();
  fechaHoy=new Date(this.fechaAux.getTime());
  hoy=new FechaEsp(this.fechaHoy).toString();

  urlsCeremonia;
  urlsLocacion;
  urlsDecoracion;
  urlsMenu;

  ngOnInit(): void {
    this.posibles = false;
    //this.verificaPosibles();
    this.userKey=this.route.snapshot.paramMap.get('id');
    this.eventoActual();
    this.verificaPosibles();
    
    document.getElementById("panelCeremonia").style.display="none";
    document.getElementById("panelLocacion").style.display="none";
    document.getElementById("panelDecoracion").style.display="none";
    document.getElementById("panelBanquete").style.display="none";
    
  }
  
  async verificaPosibles(){
    var pos =await this.dbAcc.read('posibles/');
    console.log(pos);
    if(pos!=null){
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
    if(pos != null){ //Ya existe un cliente con este usuario
      var obj = JSON.parse(JSON.stringify(pos));
      total = obj.eventos.total;
      total = total + 1;
      try{
        //Se agregan los datos de un nuevo evento en la información del usuario
        this.dbAcc.write('/usuarios/'+cliente+'/eventos/'+total,cliente+"_"+total);
        this.dbAcc.write('/usuarios/'+cliente+'/eventos/total',total);
        this.dbAcc.write('/usuarios/'+cliente+'/eventoActual',cliente+"_"+total);
        //Actualiza numero y mail
        this.dbAcc.write('/usuarios/'+cliente+'/telefono',info.telefono);
        this.dbAcc.write('/usuarios/'+cliente+'/mail',info.mail);
      }catch (error) {
        alert("ERROR: Contacte a un supervisor");
      }
    }
    else{ //No existe el cliente
      total=1;
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

  async escribeInfoEvento(info,cliente,total){
    var totalOrg =await this.dbAcc.read('/usuarios/'+this.userKey+'/eventos/total');
    var idEv=cliente+"_"+total;
    try{
      //Se agregan los datos del nuevo evento
      this.dbAcc.write('/eventos/'+idEv+'/fechaContratacion',this.hoy+'');
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
      this.dbAcc.write('/eventos/'+idEv+'/organiza',this.userKey);
      //Se agregan los datos del evento al organizador
        this.dbAcc.write('/usuarios/'+this.userKey+'/eventos/'+totalOrg+1,cliente+"_"+total);
        this.dbAcc.write('/usuarios/'+this.userKey+'/eventos/total',totalOrg+1);
        this.dbAcc.write('/usuarios/'+this.userKey+'/eventoActual',cliente+"_"+total);
      //Se borran los posibles
      //En la lógica actual solo puede haber un posible que este pendiente
      this.dbAcc.delete('posibles'); 
      this.posibles=false;
      this.eventoActual();
    }catch (error) {
      alert("ERROR: Contacte a un supervisor");
    }
  }

  async eventoActual(){
    this.actual = await this.dbAcc.read('usuarios/'+this.userKey+'/eventoActual');
    if(this.actual!=null){
      this.infoGeneralEventoActual();
    }
    
  }

  async infoGeneralEventoActual(){
    //Información del cliente
    var cliente = this.getClienteFromEvento(this.actual);
    var objCli = await this.dbAcc.read('usuarios/'+cliente);

    //Información general del evento
    var obj = await this.dbAcc.readJSON('eventos/'+this.actual);

    //Información de formularios de detalles
    var formDecoracion = await this.dbAcc.readJSON('formularios/'+this.actual+'/decoracion');
    var form

    this.llenaInfoActual(objCli, obj);
  }

  llenaInfoActual(objCli, obj){
    //Elemento HTML para agregar la info
    var panelInfo = document.getElementById("panelInformacionCliente");
    var panelInfo2 = document.getElementById("panelInformacionEvento1");
    var panelInfo3 = document.getElementById("panelInformacionEvento2");

    //Info del cliente
    panelInfo.insertAdjacentHTML('beforeend','<h5>Cliente </h5>');
    panelInfo.insertAdjacentHTML('beforeend','<p>Nombre: '+objCli.nombre+' </p>');
    panelInfo.insertAdjacentHTML('beforeend','<p>Teléfono: '+objCli.telefono+' </p>');
    panelInfo.insertAdjacentHTML('beforeend','<p>Correo electrónico: '+objCli.mail+' </p>');
    console.log(objCli.eventos.total);

    //Info general del evento
    panelInfo2.insertAdjacentHTML('beforeend','<h5>Evento </h5>');
    panelInfo2.insertAdjacentHTML('beforeend','<p>Tipo de evento: '+obj.tipo+' </p>');
    panelInfo2.insertAdjacentHTML('beforeend','<p>Fecha: '+obj.fecha+' </p>');
    panelInfo2.insertAdjacentHTML('beforeend','<p>Ciudad: '+obj.ciudad+' </p>');
    panelInfo2.insertAdjacentHTML('beforeend','<p>Tipo de locación: '+obj.tipoLocacion+' </p>');
    if(obj.ceremonia=="Sin ceremonia"){
      panelInfo3.insertAdjacentHTML('beforeend','<p>Ceremonia: '+obj.ceremonia+' </p>');
    }
    else{
      this.ceremoniaBand=true;
      panelInfo3.insertAdjacentHTML('beforeend','<p>Ceremonia: '+obj.tipoCeremonia+' </p>');
    }
    panelInfo3.insertAdjacentHTML('beforeend','<p>Invitados: '+obj.numInvitados+' </p>');
    panelInfo3.insertAdjacentHTML('beforeend','<p>Presupuesto: '+obj.presupuesto+' </p>');
    panelInfo3.insertAdjacentHTML('beforeend','<p>Comentarios: '+obj.comentariosIniciales+' </p>');
  }

  async infoPropuestasEventoActual(){
    //Elemento HTML para agregar la info
    var panelInfo = document.getElementById("panelInformacion");
    var info = await this.dbAcc.read('/propuestas/'+this.actual);
  }
  
  opcionSeleccionada(){
    var sel = (document.getElementById("categoria") as HTMLSelectElement).value;
    switch(sel){
      case "Ceremonia":
        (document.getElementById("panelCeremonia") as HTMLElement).style.display="block";
        (document.getElementById("panelLocacion") as HTMLElement).style.display="none";
        (document.getElementById("panelDecoracion") as HTMLElement).style.display="none";
        (document.getElementById("panelBanquete") as HTMLElement).style.display="none";
        break;
      case "Locación":
        (document.getElementById("panelCeremonia") as HTMLElement).style.display="none";
        (document.getElementById("panelLocacion") as HTMLElement).style.display="block";
        (document.getElementById("panelDecoracion") as HTMLElement).style.display="none";
        (document.getElementById("panelBanquete") as HTMLElement).style.display="none";
        break;
      case "Decoración":
        (document.getElementById("panelCeremonia") as HTMLElement).style.display="none";
        (document.getElementById("panelLocacion") as HTMLElement).style.display="none";
        (document.getElementById("panelDecoracion") as HTMLElement).style.display="block";
        (document.getElementById("panelBanquete") as HTMLElement).style.display="none";
        break;
      case "Banquete y bebidas":
        (document.getElementById("panelCeremonia") as HTMLElement).style.display="none";
        (document.getElementById("panelLocacion") as HTMLElement).style.display="none";
        (document.getElementById("panelDecoracion") as HTMLElement).style.display="none";
        (document.getElementById("panelBanquete") as HTMLElement).style.display="block";
        break;

    }
  }

  //Metodos escuchados al cargar los archivos
  async cargaFotosCeremonia(){
    var totalOpciones= await this.dbAcc.read('propuestas/'+this.actual+'/ceremonia/total');
    var total;
    if(totalOpciones == null){
      total = 1;
    }else{
      total = parseInt(totalOpciones)+1;
    }
    try{
      var fotos = (document.getElementById("fotosCeremonia") as HTMLInputElement).files;
      this.urlsCeremonia = await this.sts.uploadImages('propuestas/'+this.actual+'/ceremonia/'+total,fotos)
      //this.metodoPrueba(urls);
    }
    catch(e){
      console.log(e);
    }
  }

  async cargaFotosLocacion(){
    var totalOpciones= await this.dbAcc.read('propuestas/'+this.actual+'/locacion/total');
    var total;
    if(totalOpciones == null){
      total = 1;
    }else{
      total = parseInt(totalOpciones)+1;
    }
    try{
      var fotos = (document.getElementById("fotosLocacion") as HTMLInputElement).files;
      this.urlsLocacion = await this.sts.uploadImages('propuestas/'+this.actual+'/locacion/'+total,fotos)
    }
    catch(e){
      console.log(e);
    }
  }

  async cargaFotosDecoracion(){
    var totalOpciones= await this.dbAcc.read('propuestas/'+this.actual+'/decoracion/total');
    var total;
    if(totalOpciones == null){
      total = 1;
    }else{
      total = parseInt(totalOpciones)+1;
    }
    try{
      var fotos = (document.getElementById("fotosDecoracion") as HTMLInputElement).files;
      this.urlsDecoracion = await this.sts.uploadImages('propuestas/'+this.actual+'/decoracion/'+total,fotos);
    }
    catch(e){
      console.log(e);
    }
  }

  async cargaArchivosMenu(){
    var totalOpciones= await this.dbAcc.read('propuestas/'+this.actual+'/banquete/total');
    var total;
    if(totalOpciones == null){
      total = 1;
    }else{
      total = parseInt(totalOpciones)+1;
    }
    try{
      var menu = (document.getElementById("contenidoMenu") as HTMLInputElement).files;
      this.urlsMenu = await this.sts.uploadImages('propuestas/'+this.actual+'/banquete/'+total,menu);
    }
    catch(e){
      console.log(e);
    }
  }

  async agregarCeremonia(){
    var totalOpciones= await this.dbAcc.read('propuestas/'+this.actual+'/ceremonia/total');
    var total;
    if(totalOpciones == null){
      total = 1;
    }else{
      total = parseInt(totalOpciones)+1;
    }
    console.log(total);
    console.log(this.actual);
    this.dbAcc.write('propuestas/'+this.actual+'/ceremonia/total',total);
    
    //Recuperamos el valor de los inputs
    var nombre = (document.getElementById("nombreCeremonia") as HTMLInputElement).value;
    var direccion = (document.getElementById("direccionCeremonia") as HTMLInputElement).value;
    var capacidad = (document.getElementById("capacidadCeremonia") as HTMLInputElement).value;
    var detalles = (document.getElementById("detallesCeremonia") as HTMLInputElement).value;
    var fotos = (document.getElementById("fotosCeremonia") as HTMLInputElement).files;
    
    //Cargamos las urls de las fotos en la BD 
    var ref='propuestas/'+this.actual+'/ceremonia/'+total+'/fotos';
    for(var i=1; i<=this.urlsCeremonia.length; i++){
      this.dbAcc.write('propuestas/'+this.actual+'/ceremonia/'+total+'/fotos/'+i,this.urlsCeremonia[i-1]);
    }
    this.dbAcc.write('propuestas/'+this.actual+'/ceremonia/'+total+'/fotos/totalFotos',this.urlsCeremonia.length);

    //Escribimos los datos en la BD
    this.dbAcc.write('propuestas/'+this.actual+'/ceremonia/'+total+'/fecha',''+this.hoy);
    this.dbAcc.write('propuestas/'+this.actual+'/ceremonia/'+total+'/nombre',nombre);
    this.dbAcc.write('propuestas/'+this.actual+'/ceremonia/'+total+'/direccion',direccion);
    this.dbAcc.write('propuestas/'+this.actual+'/ceremonia/'+total+'/capacidad',capacidad);
    this.dbAcc.write('propuestas/'+this.actual+'/ceremonia/'+total+'/detalles',detalles);

    //Limpiamos los inputs para que este disponible para nuevas opciones
    (document.getElementById("nombreCeremonia") as HTMLInputElement).value="";
    (document.getElementById("direccionCeremonia") as HTMLInputElement).value="";
    (document.getElementById("capacidadCeremonia") as HTMLInputElement).value="";
    (document.getElementById("detallesCeremonia") as HTMLInputElement).value="";
    (document.getElementById("fotosCeremonia") as HTMLInputElement).value="";
  }

  

  async agregarLocacion(){
    var totalOpciones= await this.dbAcc.read('propuestas/'+this.actual+'/locacion/total');
    var total;
    if(totalOpciones == null){
      total = 1;
    }else{
      total = parseInt(totalOpciones)+1;
    }
    console.log(total);
    console.log(this.actual);
    this.dbAcc.write('propuestas/'+this.actual+'/locacion/total',total);

    //Recuperamos el valor de los inputs
    var nombre = (document.getElementById("nombreLocacion") as HTMLInputElement).value;
    var direccion = (document.getElementById("direccionLocacion") as HTMLInputElement).value;
    var capacidad = (document.getElementById("capacidadLocacion") as HTMLInputElement).value;
    var detalles = (document.getElementById("detallesLocacion") as HTMLInputElement).value;
    
    //Escribimos los datos en la BD
    this.dbAcc.write('propuestas/'+this.actual+'/locacion/'+total+'/fecha',''+this.hoy);
    this.dbAcc.write('propuestas/'+this.actual+'/locacion/'+total+'/nombre',nombre);
    this.dbAcc.write('propuestas/'+this.actual+'/locacion/'+total+'/direccion',direccion);
    this.dbAcc.write('propuestas/'+this.actual+'/locacion/'+total+'/capacidad',capacidad);
    this.dbAcc.write('propuestas/'+this.actual+'/locacion/'+total+'/detalles',detalles);

    //Cargamos las urls de las fotos en la BD 
    for(var i=1; i<=this.urlsLocacion.length; i++){
      this.dbAcc.write('propuestas/'+this.actual+'/locacion/'+total+'/fotos/'+i,this.urlsLocacion[i-1]);
    }
    this.dbAcc.write('propuestas/'+this.actual+'/locacion/'+total+'/fotos/totalFotos',this.urlsLocacion.length);

    //Limpiamos los inputs para que este disponible para nuevas opciones
    (document.getElementById("nombreLocacion") as HTMLInputElement).value="";
    (document.getElementById("direccionLocacion") as HTMLInputElement).value="";
    (document.getElementById("capacidadLocacion") as HTMLInputElement).value="";
    (document.getElementById("detallesLocacion") as HTMLInputElement).value="";
    (document.getElementById("fotosLocacion") as HTMLInputElement).value="";

    
  }

  async agregarDecoracion(){
    var totalOpciones= await this.dbAcc.read('propuestas/'+this.actual+'/decoracion/total');
    var total;
    if(totalOpciones == null){
      total = 1;
    }else{
      total = parseInt(totalOpciones)+1;
    }
    console.log(total);
    console.log(this.actual);
    this.dbAcc.write('propuestas/'+this.actual+'/decoracion/total',total);
    
    //Recuperamos el valor de los inputs
    var nombre = (document.getElementById("nombreDecoracion") as HTMLInputElement).value;
    var detalles = (document.getElementById("detallesDecoracion") as HTMLInputElement).value;
    var fotos = (document.getElementById("fotosDecoracion") as HTMLInputElement).files;
    
    //Cargamos las urls de las fotos en la BD 
    var ref='propuestas/'+this.actual+'/decoracion/'+total+'/fotos';
    for(var i=1; i<=this.urlsDecoracion.length; i++){
      this.dbAcc.write('propuestas/'+this.actual+'/decoracion/'+total+'/fotos/'+i,this.urlsDecoracion[i-1]);
    }
    
    this.dbAcc.write('propuestas/'+this.actual+'/decoracion/'+total+'/fotos/totalFotos',this.urlsCeremonia.length);
    
    //Escribimos los datos en la BD
    this.dbAcc.write('propuestas/'+this.actual+'/decoracion/'+total+'/fecha',''+this.hoy);
    this.dbAcc.write('propuestas/'+this.actual+'/decoracion/'+total+'/nombre',nombre);
    this.dbAcc.write('propuestas/'+this.actual+'/decoracion/'+total+'/detalles',detalles);

    //Limpiamos los inputs para que este disponible para nuevas opciones
    (document.getElementById("nombreDecoracion") as HTMLInputElement).value="";
    (document.getElementById("detallesDecoracion") as HTMLInputElement).value="";
    (document.getElementById("fotosDecoracion") as HTMLInputElement).value="";

  }

  async agregarMenu(){
    var totalOpciones= await this.dbAcc.read('propuestas/'+this.actual+'/banquete/total');
    var total;
    if(totalOpciones == null){
      total = 1;
    }else{
      total = parseInt(totalOpciones)+1;
    }
    console.log(total);
    console.log(this.actual);
    this.dbAcc.write('propuestas/'+this.actual+'/banquete/total',total);
    
    //Recuperamos el valor de los inputs
    var nombre = (document.getElementById("nombreMenu") as HTMLInputElement).value;
    
    
    //Cargamos las urls de los menus en la BD 
    for(var i=1; i<=this.urlsMenu.length; i++){
      this.dbAcc.write('propuestas/'+this.actual+'/banquete/'+total+'/menu',this.urlsMenu[i-1]);
    }
    //this.dbAcc.write('propuestas/'+this.actual+'/banquete/'+total+'/totalMenus',this.urlsMenu.length);
    
    //Escribimos los datos en la BD
    this.dbAcc.write('propuestas/'+this.actual+'/banquete/'+total+'/fecha',''+this.hoy);
    this.dbAcc.write('propuestas/'+this.actual+'/banquete/'+total+'/nombre',nombre);

    //Limpiamos los inputs para que este disponible para nuevas opciones
    (document.getElementById("nombreMenu") as HTMLInputElement).value="";
    (document.getElementById("contenidoMenu") as HTMLInputElement).value="";
  }

  getClienteFromEvento(evento:String){
    var i=0;
    var key="";
    while(evento[i]!='_' && i<evento.length){
      key=key+evento[i];
      i++;
    }
    return key;
  }


}