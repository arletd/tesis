import { Component, OnInit, Input} from '@angular/core';
import { dbFunctions } from '../../databaseAccess/dbFunc';

@Component({
  selector: 'app-banquete',
  templateUrl: './banquete.component.html',
  styleUrls: ['./banquete.component.css']
})
export class BanqueteComponent implements OnInit {
  @Input() userName;
  @Input() userKey;
  @Input() orgName;
  @Input() orgKey;
  @Input() actual;

  propuestasBand=false;
  formularioBand=false;
  mensajeBand=false;

  constructor(private dbAcc: dbFunctions) { }

  ngOnInit(): void {
    this.inicio();
  }

  async inicio(){
    var forms = await this.dbAcc.read('formularios/'+this.actual+'/banquete');
    var props = await this.dbAcc.read('propuestas/'+this.actual+'/banquete');
    if(forms==null){
      this.formularioBand=true;
    }
    else{
      if(props==null){
        this.mensajeBand=true;
      }else{
        this.propuestasBand=true;
        this.getInformacion();
      }
    }
  }

  //Cuando ya se tienen propuestas
  async getInformacion(){
    var div=(document.getElementById("propuestasBenquete") as HTMLElement);
    var totalOb = await this.dbAcc.read('propuestas/'+this.actual+'/banquete/total');
    var total;
    if(totalOb== null){
      total = 0;
    }
    else{
      total = parseInt(totalOb);
    }
    for(var i=1; i<=total;i++){
      var nomMenu = await this.dbAcc.read('propuestas/'+this.actual+'/banquete/'+i+'/nombre');
      var menu = await this.dbAcc.read('propuestas/'+this.actual+'/banquete/'+i+'/menu');
      this.cargarInformacion(div,nomMenu,menu);
    }
  }

  cargarInformacion(div:HTMLElement,nomMenu:String,menu:String){
    console.log(nomMenu);
    console.log(menu);
    var row1="<br><h4>"+nomMenu+"</h4>";
    var row2="<embed src='"+menu+"' type='application/pdf' style='width: 100%; height: 500px;'><br>";
    div.insertAdjacentHTML('beforeend',row1);
    div.insertAdjacentHTML('beforeend',row2);
  }

  guardarFormulario(){
    //Recuperamos los valores del formulario
    var tiempos=(document.getElementById("tiemposMenu") as HTMLInputElement).value;
    
    var form = document.forms.namedItem("formBanquete");

    var postreAux = form.elements.namedItem("postreListItem") as RadioNodeList;
    var aperitivoAux = form.elements.namedItem("aperitivosListItem") as RadioNodeList;
    var infantilAux = form.elements.namedItem("infantilListItem") as RadioNodeList;
    var todosVegAux = form.elements.namedItem("generalVeganoListItem") as RadioNodeList;    
    var unosVegAux = form.elements.namedItem("algunosVeganoListItem") as RadioNodeList;

    var coctelAux = form.elements.namedItem("coctelListItems") as RadioNodeList;
    var alcoholAux = form.elements.namedItem("alcoholListItems") as RadioNodeList;
    
    var postre = postreAux.value;
    var aperitivo = aperitivoAux.value;
    var infantil = infantilAux.value;
    var todosVeg = todosVegAux.value;
    var unosVeg = unosVegAux.value;
    var coctel = coctelAux.value;
    var alcohol = alcoholAux.value;

    var tiposAlcohol = (document.getElementById("tiposAlcohol") as HTMLInputElement).value;

    //Escribimos los datos en la BD
    this.dbAcc.write('formularios/'+this.actual+'/banquete/tiempos',tiempos);
    this.dbAcc.write('formularios/'+this.actual+'/banquete/postre',postre);
    this.dbAcc.write('formularios/'+this.actual+'/banquete/aperitivo',aperitivo);
    this.dbAcc.write('formularios/'+this.actual+'/banquete/infantil',infantil);
    this.dbAcc.write('formularios/'+this.actual+'/banquete/todosVeg',todosVeg);
    this.dbAcc.write('formularios/'+this.actual+'/banquete/unosVeg',unosVeg);
    this.dbAcc.write('formularios/'+this.actual+'/banquete/coctel',coctel);
    this.dbAcc.write('formularios/'+this.actual+'/banquete/alcohol',alcohol);
    this.dbAcc.write('formularios/'+this.actual+'/banquete/tiposAlcohol',tiposAlcohol);
  }

}
