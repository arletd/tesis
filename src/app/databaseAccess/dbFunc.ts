import { Injectable } from '@angular/core'; //Default
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'; //Se importa herramientas de firebase para trabajar sobre la bd
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
  })
  export class dbFunctions {
 
    //Se inicializa una variable privada que se diriga a la base de datos de firebase online
    constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) { 
    }

    //Metodo generado para dormir por milisegundos
    sleep(milliseconds: number) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
    //Metodo para escribir en la base de datos de firebase
    write(ref:string, val: string){
        this.db.database.ref('/'+ref).set(val); 
    }   
    //Metodo para borrar una rama de la base de datos
    delete(ref: string) { 
      this.db.database.ref('/'+ref+'/').remove(); //Con la referencia y la llave única se puede acceder a la rama del árbol y se borra.
    }
   
    //Metodo asincrono para leer una rama de la base de datos
    async read(ref:string){ //Con este codigo podemos leer información especifica dentro del arbol.
        var k="";
        var reff=this.db.database.ref('/'+ref);
        
        const doc= await reff.once("value",function(snapshot){ //Se crea un snapshot para copiar lo que se ve en el arbol
           k=(snapshot.val());
        });
        
        return k;
    } 

    //Metodo asincrono para leer una rama de la base de datos y lo devuelve como JSON
    async readJSON(ref:string){ //Con este codigo podemos leer información especifica dentro del arbol.
      var k="";
      var reff=this.db.database.ref('/'+ref);
      
      const doc= await reff.once("value",function(snapshot){ //Se crea un snapshot para copiar lo que se ve en el arbol
         k=(snapshot.val());
      });

      var obj = JSON.parse(JSON.stringify(k));
      return obj; 
  } 

    //Metodo para obtener la llave dado un correo, se filtran caracteres raros y lo que esta despues del @
    getKey(email: string){
        var i;
        var res="";
        for (i = 0; i < email.length; i++) {
          if(email[i]=="."){
            res=res;
          }
          else{
            if(email[i]!="@"){
              res=res+email[i];
            } 
            else{
              break;
            }
          }
        }
        return res;
      }
  }