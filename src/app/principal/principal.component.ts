import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  imagenes=[
    "https://firebasestorage.googleapis.com/v0/b/tesita-6885a.appspot.com/o/Carrusel%2FIMG_20170127_162025256.jpg?alt=media&token=668aeef0-fcae-424f-af14-e81ef65c4799",
    "https://firebasestorage.googleapis.com/v0/b/tesita-6885a.appspot.com/o/Carrusel%2FIMG_20170114_125738158_HDR.jpg?alt=media&token=e28b4a2e-1b46-41e1-a04a-58def8d8bfe6",
    "https://firebasestorage.googleapis.com/v0/b/tesita-6885a.appspot.com/o/Carrusel%2FIMG_20170217_194951376.jpg?alt=media&token=8a4c92a4-434a-4e2e-bee4-e8612befa9b8",
    "https://firebasestorage.googleapis.com/v0/b/tesita-6885a.appspot.com/o/Carrusel%2FIMG_20170212_185839896.jpg?alt=media&token=b3d883bc-1a1f-4bdc-a1ac-8f1dc6c4a469",
    "https://firebasestorage.googleapis.com/v0/b/tesita-6885a.appspot.com/o/Carrusel%2FIMG_20170307_173233059.jpg?alt=media&token=bee41f9f-f4cd-466f-894a-a771297695f6",
    "https://firebasestorage.googleapis.com/v0/b/tesita-6885a.appspot.com/o/Carrusel%2FIMG_20170307_172334411.jpg?alt=media&token=6a62cd4c-c88c-4477-8142-705354306c8c",
    "https://firebasestorage.googleapis.com/v0/b/tesita-6885a.appspot.com/o/Carrusel%2FIMG_20170307_173949065_HDR.jpg?alt=media&token=bddba2fc-58b5-40de-8568-e1c69d78c9cf",
    "https://firebasestorage.googleapis.com/v0/b/tesita-6885a.appspot.com/o/Carrusel%2FIMG_20170311_185014096.jpg?alt=media&token=3e107a15-b833-4f78-abd6-74d91750cd18",
    "https://firebasestorage.googleapis.com/v0/b/tesita-6885a.appspot.com/o/Carrusel%2FIMG_20170408_163139750.jpg?alt=media&token=ca3986cb-fbda-42cc-8e5d-2013c948356f",
    "https://firebasestorage.googleapis.com/v0/b/tesita-6885a.appspot.com/o/Carrusel%2FIMG_20170625_180455002.jpg?alt=media&token=c59917e4-11aa-457d-84f9-de76683bda27",
    "https://firebasestorage.googleapis.com/v0/b/tesita-6885a.appspot.com/o/Carrusel%2FIMG_20170625_180703513.jpg?alt=media&token=24fb416f-b66c-4230-9d1b-bf8912f90de1",
    "https://firebasestorage.googleapis.com/v0/b/tesita-6885a.appspot.com/o/Carrusel%2FIMG_20170707_201716948.jpg?alt=media&token=08821bd2-f3f5-4f4b-9a86-3cf21893c8fd",
    "https://firebasestorage.googleapis.com/v0/b/tesita-6885a.appspot.com/o/Carrusel%2FIMG_20170625_180923907.jpg?alt=media&token=74cf388e-bb51-4b9c-8cd0-1e4f06baa03f",
    "https://firebasestorage.googleapis.com/v0/b/tesita-6885a.appspot.com/o/Carrusel%2FIMG_20170422_193339568.jpg?alt=media&token=60852799-a521-433f-8c6d-23cb139661c4"
  ]
  ngOnInit(): void {
    this.cargaImagenes();
  }

  cargaImagenes(){
    var car = (document.getElementById("carrusel"));
    var ind = (document.getElementById("indicadores"));
    var n = this.imagenes.length;
    var li = '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>';
    var img = '<div class="carousel-item active"><img src=' + this.imagenes[0] +' class="mw-100 mh-100" style="width: 9000px; height: 450px;"></div>'
    ind.insertAdjacentHTML('beforeend',li);
    car.insertAdjacentHTML('beforeend', img);
    for(var i=1;i<n;i++){
      li = '<li data-target="#myCarousel" data-slide-to="'+i+'"></li>';
      img = '<div class="carousel-item"><img src=' + this.imagenes[i] +' class="mw-100 mh-100" style="width: 9000px; height: 450px;"></div>';
      ind.insertAdjacentHTML('beforeend',li);
      car.insertAdjacentHTML('beforeend', img);
    }
  }
  
}
