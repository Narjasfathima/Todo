import { Component } from '@angular/core';

import {FormBuilder,Validators} from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder,private ds:DataService,private r:Router){}


  regform=this.fb.group({
    // uname:'', 
    // email:'', 
    // pswd:'', 
    // rpswd:'', 
    uname:['',[Validators.required,Validators.minLength(5)]],
    email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    pswd:['',[Validators.required,Validators.minLength(5),Validators.pattern('[a-zA-Z0-9@!#$%^&*]+')]],
    rpswd:['',Validators.required],
  })


  submitted(){
    console.log(this.regform.value)
    var username=this.regform.value.uname
    var email=this.regform.value.email
    var pswd=this.regform.value.pswd
    var rpswd=this.regform.value.rpswd
    if (pswd == rpswd){
      var data={username:username,password:pswd,email:email}
      // var data={username,password:pswd,email}
      this.ds.signup(data).then(res=>res.json()).then(res=>{
        if(res['msg']=='created'){
          alert("Registration Successfull")
          this.r.navigateByUrl('')
        }
        else{          
          alert("Registration Failed")
        }
      })
    
    }
    else{    
      alert("Password Missmatch")
    }
  }
}
