import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  signup(data:any){
     return fetch('http://127.0.0.1:8000/user/', {
            method: 'POST',
            body: JSON.stringify(data),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    })
  }
    signin(data:any){
      return fetch('http://127.0.0.1:8000/token', {
             method: 'POST',
             body: JSON.stringify(data),
          headers: {
             'Content-type': 'application/json; charset=UTF-8',
           },
     })
  }

  todolist(){
    return fetch('http://127.0.0.1:8000/todo/', {
             method: 'GET',
          headers: {
             'Content-type': 'application/json; charset=UTF-8',
             'Authorization':`Token ${localStorage.getItem('token')}`
           },
     })
  }

  addtodo(data:any){
    return fetch('http://127.0.0.1:8000/todo/', {
             method: 'POST',
             body:data,
          headers: {
             'Accept':'*/*',
             'Authorization':`Token ${localStorage.getItem('token')}`
           },
     })
  }




  deletetodo(id:any){
    return fetch(`http://127.0.0.1:8000/todo/${id}/`, {
             method: 'DELETE',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
             'Authorization':`Token ${localStorage.getItem('token')}`
           },
     })
  }
}
