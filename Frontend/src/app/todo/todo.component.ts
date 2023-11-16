import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  imgfile:any=""
  constructor(private fb:FormBuilder,private ds:DataService,private r:Router){

  }

  todoform=this.fb.group({
    title:['',Validators.required],
    desc:['',Validators.required],
    date:['',Validators.required],
    file:['',Validators.required],
  })

filesubmit(e:any){
  console.log(e.target.files[0])
  this.imgfile=e.target.files[0]
}

  submitted(){
    console.log(this.todoform.value)

    var title:any=this.todoform.value.title
    var desc:any=this.todoform.value.desc
    var date:any=this.todoform.value.date
    
    var formd=new FormData()
    formd.append('title',title)
    formd.append('desc',desc)
    formd.append('date',date)
    formd.append('file',this.imgfile,this.imgfile.filename)

    this.ds.addtodo(formd).then(res=>res.json()).then(res=>{
      if(res['msg']=='Todo added!'){
        alert("Todo added!")
        this.r.navigateByUrl('home')
      }
      else{
        alert("Todo adding is failed!")
      }
    })
  }

  
}
