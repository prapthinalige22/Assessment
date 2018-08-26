import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;  
  Username:string='';  
  Password:string='';  
  Error:string='';  
  visibility:string="hidden";

  constructor(private _authService :AuthenticationService, private fb: FormBuilder, private router: Router) {
    // To initialize FormGroup  
    this.loginForm = fb.group({  
      'Username' : [null, Validators.required],  
      'Password' : [null, Validators.required],  
      'Error' : [""]
    });
   }

  ngOnInit() {
  }

   // Executed When Form Is Submitted  
   onFormSubmit(form:NgForm)  
   {  
     console.log(form);  
     this.visibility="hidden"
      this._authService.login(form.Username, form.Password)
       .subscribe(data => {
         if(!data.error){
          sessionStorage.setItem("jsessionid",JSON.parse(JSON.stringify(data)).jsessionid);
          localStorage.setItem('currentUser', JSON.stringify(data.token));     
          this.router.navigate(['/home']);
         }
         else{
          this.Error=data.error;
          this.visibility="visible";
         }
       },
        error => {
          this.Error=error.error.msg;
          this.visibility="visible";
        });
   }

   logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}

}
