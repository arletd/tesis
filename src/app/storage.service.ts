import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { dbFunctions } from './databaseAccess/dbFunc';
import { ConstantPool } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  //Se inicializa un apuntador al storage en la nube de Firebase
  constructor(private storage:AngularFireStorage, private dbAcc: dbFunctions) { }
  
  raiz='gs://tesita-6885a.appspot.com';
  
  getImges(ref:string){
    var urls=[]
    var storageRef = this.storage.storage.refFromURL(this.raiz+'/'+ref);
    storageRef.listAll().then(function(result){
      result.items.forEach(function(imageRef) { 
        imageRef.getDownloadURL().then(function(url) {
            console.log(url);
            urls.push(url);
        });
      });
    });
    return urls;
  }

  async getImgesBis(ref:string){
    var storageRef = this.storage.storage.refFromURL(this.raiz+'/'+ref);
    storageRef.listAll().then(function(result){
      return result;
    });
  }
  
  async uploadImages(ref:String, files:FileList){
    var urls=[];
    var ruta = this.raiz + '/' + ref +'/' ;
    var i=1;
    Array.from(files).forEach(file => {
      var storageRef = this.storage.storage.refFromURL(ruta+i);
      storageRef.put(file).then(function(snapshot){
      }).then(function(){storageRef.getDownloadURL().then(function(url){
        console.log(url);
        //this.guardaURL(refdb+'/'+i,url+"");
        urls.push(url);
      })});
      i++;
    });
    return urls;
  }

  private guardaURL(ref:string,url:string){
    this.dbAcc.write(ref,url);
  }
}
