import { Component, OnInit, Input} from '@angular/core';
import { dbFunctions } from '../../databaseAccess/dbFunc';

@Component({
  selector: 'app-ceremonia',
  templateUrl: './ceremonia.component.html',
  styleUrls: ['./ceremonia.component.css']
})
export class CeremoniaComponent implements OnInit {
  @Input() userName;
  @Input() userKey;
  @Input() orgName;
  @Input() orgKey;
  @Input() actual;

  tipoCeremonia;
  opcion1;
  opcion2;
  opcion3;
  urls1=[];
  urls2=[];
  urls3=[];

  constructor(private dbAcc: dbFunctions) { }

  ngOnInit(): void {
    this.ceremoniaTipo();
    this.getInformacion();
  }

  async ceremoniaTipo(){
    this.tipoCeremonia = await  this.dbAcc.read('eventos/'+this.actual+'/tipoCeremonia');
  }

  async getInformacion(){
    var totalOb = await this.dbAcc.read('propuestas/'+this.actual+'/ceremonia/total');
    var total;
    if(totalOb== null){
      total = 0;
    }
    else{
      total = parseInt(totalOb);
    }
    console.log(total);
    var auxFotos = await this.dbAcc.readJSON('propuestas/'+this.actual+'/ceremonia/'+total+'/fotos');
    this.opcion1 = await this.dbAcc.readJSON('propuestas/'+this.actual+'/ceremonia/'+total);
    for(let foto in auxFotos){  
      if(auxFotos.hasOwnProperty(foto)){  
        this.urls1.push(auxFotos[foto]);  
      }  
    } 
    total=total-1;
    var auxFotos2 = await this.dbAcc.readJSON('propuestas/'+this.actual+'/ceremonia/'+total+'/fotos');
    this.opcion2 = await this.dbAcc.readJSON('propuestas/'+this.actual+'/ceremonia/'+total);
    for(let foto in auxFotos2){  
      if(auxFotos2.hasOwnProperty(foto)){  
        this.urls2.push(auxFotos2[foto]);  
      }  
    } 
    total=total-1;
    var auxFotos3 = await this.dbAcc.readJSON('propuestas/'+this.actual+'/ceremonia/'+total+'/fotos');
    this.opcion3 = await this.dbAcc.readJSON('propuestas/'+this.actual+'/ceremonia/'+total);
    for(let foto in auxFotos3){  
      if(auxFotos3.hasOwnProperty(foto)){  
        this.urls3.push(auxFotos3[foto]);  
      }  
    } 
  //console.log(this.urls1); 
    this.cargaInformacion();
  }

  cargaInformacion(){
    //carga opcion 1
    var n = this.urls1.length - 1;
    var car = (document.getElementById("carrusel1"));
    var ind = (document.getElementById("indicadores1"));
    var li = '<li data-target="#myCarousel1" data-slide-to="0" class="active"></li>';
    var img = '<div class="carousel-item active"><img src="' + this.urls1[0] +'" class="mw-100 mh-100" style="width: 20rem; height:11.25rem;"></div>'
    ind.insertAdjacentHTML('beforeend',li);
    car.insertAdjacentHTML('beforeend', img);
    for(var i=1;i<n;i++){
      li = '<li data-target="#myCarousel1" data-slide-to="'+i+'"></li>';
      img = '<div class="carousel-item"><img src="' + this.urls1[i] +'" class="mw-100 mh-100" style="width: 20rem; height:11.25rem;"></div>';
      ind.insertAdjacentHTML('beforeend',li);
      car.insertAdjacentHTML('beforeend', img);
    }
    (document.getElementById("nombreOpcion1") as HTMLSpanElement).innerText=this.opcion1.nombre;
    (document.getElementById("capacidadOpcion1") as HTMLSpanElement).innerText=this.opcion1.capacidad;
    (document.getElementById("direccionOpcion1") as HTMLSpanElement).innerText=this.opcion1.direccion;
    (document.getElementById("detallesOpcion1") as HTMLSpanElement).innerText=this.opcion1.detalles;

    //carga opcion 2
    var n2 = this.urls2.length - 1;
    var car2 = (document.getElementById("carrusel2"));
    var ind2 = (document.getElementById("indicadores2"));
    var li2 = '<li data-target="#myCarousel2" data-slide-to="0" class="active"></li>';
    var img2 = '<div class="carousel-item active"><img src="' + this.urls2[0] +'" class="mw-100 mh-100" style="width: 20rem; height:11.25rem;"></div>'
    ind2.insertAdjacentHTML('beforeend',li2);
    car2.insertAdjacentHTML('beforeend', img2);
    for(var i=1;i<n2;i++){
      li2 = '<li data-target="#myCarousel2" data-slide-to="'+i+'"></li>';
      img2 = '<div class="carousel-item"><img src="' + this.urls2[i] +'" class="mw-100 mh-100" style="width: 20rem; height:11.25rem;"></div>';
      ind2.insertAdjacentHTML('beforeend',li2);
      car2.insertAdjacentHTML('beforeend', img2);
    }
    (document.getElementById("nombreOpcion2") as HTMLSpanElement).innerText=this.opcion2.nombre;
    (document.getElementById("capacidadOpcion2") as HTMLSpanElement).innerText=this.opcion2.capacidad;
    (document.getElementById("direccionOpcion2") as HTMLSpanElement).innerText=this.opcion2.direccion;
    (document.getElementById("detallesOpcion2") as HTMLSpanElement).innerText=this.opcion2.detalles;

    //carga opcion 3
    var n3 = this.urls3.length - 1;
    var car3 = (document.getElementById("carrusel3"));
    var ind3 = (document.getElementById("indicadores3"));
    var li3 = '<li data-target="#myCarousel3" data-slide-to="0" class="active"></li>';
    var img3 = '<div class="carousel-item active"><img src="' + this.urls3[0] +'" class="mw-100 mh-100" style="width: 20rem; height:11.25rem;"></div>'
    ind3.insertAdjacentHTML('beforeend',li3);
    car3.insertAdjacentHTML('beforeend', img3);
    for(var i=1;i<n3;i++){
      li3 = '<li data-target="#myCarousel3" data-slide-to="'+i+'"></li>';
      img3 = '<div class="carousel-item"><img src="' + this.urls3[i] +'" class="mw-100 mh-100" style="width: 20rem; height:11.25rem;"></div>';
      ind3.insertAdjacentHTML('beforeend',li3);
      car3.insertAdjacentHTML('beforeend', img3);
    }
    (document.getElementById("nombreOpcion3") as HTMLSpanElement).innerText=this.opcion3.nombre;
    (document.getElementById("capacidadOpcion3") as HTMLSpanElement).innerText=this.opcion3.capacidad;
    (document.getElementById("direccionOpcion3") as HTMLSpanElement).innerText=this.opcion3.direccion;
    (document.getElementById("detallesOpcion3") as HTMLSpanElement).innerText=this.opcion3.detalles;
    
    //carga opciones en el dropdownlist
    var ddl = (document.getElementById("opcionCeremonia") as HTMLSelectElement);
    var option = document.createElement("option");
    var option2 = document.createElement("option");
    var option3 = document.createElement("option");
    option.text=this.opcion1.nombre;
    option.value==this.opcion1.nombre;
    ddl.add(option);
    option2.text=this.opcion2.nombre;
    option2.value==this.opcion2.nombre;
    ddl.add(option2);
    option3.text=this.opcion3.nombre;
    option3.value==this.opcion3.nombre;
    ddl.add(option3);
  }

  guardarEleccion(){
    var elecccion = (document.getElementById("opcionCeremonia") as HTMLSelectElement).value;
    this.dbAcc.write('/eventos/'+this.actual+'/decisiones/ceremonia',elecccion);
    alert("Se guardó la elección: "+elecccion);
  }
}
