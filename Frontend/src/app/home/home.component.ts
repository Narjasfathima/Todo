import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  data:any=[]

getData(data:any){
  this.data=data
  console.log(this.data)
}

  constructor(private ds:DataService,private r:Router){
    this.ds.todolist().then(res=>res.json()).then(res=>this.getData(res))
  }

  deleteTodo(e:any){
    this.ds.deletetodo(e.target.id).then(res=>res.json()).then(res=>{
      if(res['msg']=="deleted"){
        alert("Todo deleted successfully")
        this.r.navigateByUrl('',{skipLocationChange:true}).then(res=>this.r.navigate(['home']))
      }
      else{
        alert("Todo deleted failed")
      }
    })
  }


}
