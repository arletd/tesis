import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decoracion',
  templateUrl: './decoracion.component.html',
  styleUrls: ['./decoracion.component.css']
})
export class DecoracionComponent implements OnInit {

  constructor() { }
  fileName="Busca tus imágenes";

  ngOnInit(): void {
  }
  file;
  subirArchivo(){
    console.log("cambio");
    this.file=(document.getElementById("exampleFormControlFile1") as HTMLInputElement).files;
    console.log(this.file);
  }

}
