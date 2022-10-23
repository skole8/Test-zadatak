import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    email:'',
    password:''
  }

  email:string='';
  password:string='';
  confirmPassword:string='';

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token'))
      this.router.navigate(['main']);
  }

  register()
  {
    if(this.email.length>5 && this.password==this.confirmPassword)
    {
      this.user.email=this.email;
      this.user.password=this.password;
        this.loginService.registration(this.user).subscribe(data=>{
          alert("Uspjesno ste se registrovali");
          document.getElementById("divLogin")!.style.display="block";
          document.getElementById("divRegistracija")!.style.display="none";
    },
    error=>{
      alert("Korisnik vec postoji!");
    }
    );
    this.resetujForme();
    
  }
  else
    alert("Neispravni podaci za registraciju!");
  }
  login()
  {
    this.loginService.login(this.user).subscribe(data=>
      {
        localStorage.setItem('token',data);
        this.router.navigate(['main']);
        
      },
      error=>{
        alert("Neuspjesn login");
      });
  }

otvoriFormuZaRegistraciju()
{
  document.getElementById("divLogin")!.style.display="none";
  document.getElementById("divRegistracija")!.style.display="block";
}

otkaziRegistraciju()
{
  document.getElementById("divLogin")!.style.display="block";
  document.getElementById("divRegistracija")!.style.display="none";
  this.resetujForme();
}

    resetujForme()
    {
      this.email='';
      this.password='';
      this.confirmPassword='';
      this.user.email='';
      this.user.password='';
    }
}
