import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from  '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  contactForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http : HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({  
      email: [''],
      password: ['']
    });
  }

  onSubmit(){
    this.http.get<any>("http://localhost:5000/signupUsers")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.contactForm.value.email && a.password === this.contactForm.value.password
      });
      if(user){
        this.contactForm.reset();
        this.router.navigate(['dashboard'])
      }else{
        alert("User not found!");
      }
    },err=>{
      // console.log('Your form data : ', this.contactForm.value );
      alert("Something went wrong!")
    })
  }

}
