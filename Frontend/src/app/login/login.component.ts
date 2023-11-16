import { Component } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private fb:FormBuilder,private ds:DataService,private r:Router){}

    logform=this.fb.group({
      // uname:'',
      // pswd:'',
      
      username:['',Validators.required],
      password:['',Validators.required],
    })


    submitted(){
      console.log(this.logform.value)
      this.ds.signin(this.logform.value).then(res=>res.json()).then(res=>{
        if(res['token']){
          alert("Login successfull")
          localStorage.setItem("token",res['token'])
          this.r.navigateByUrl('home')
        }
        else{
          alert("Login Failed")
        }
      })
    }
}
