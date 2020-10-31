import { Component } from '@angular/core';
import { Router, ActivatedRoute } from  "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  in : boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,public afAuth: AngularFireAuth){};

  
  //Logout de Firebase
  logout(){
    console.log("Logout done");
    this.in = false;
    this.afAuth.signOut().then(data=>
      this.router.navigate(['/'])
    );
  }

  login(){
    console.log("mequierenloguear");
  }
}
