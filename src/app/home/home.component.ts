import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  addUserForm!: FormGroup;
  data:any;
  id:string="";

  editForm!:FormGroup;
  constructor(private fb: FormBuilder, private service: ServiceService, private active:ActivatedRoute) {}

  ngOnInit() {
    this.id=this.active.snapshot.params['id'];
    this.formInitialization();
    this.getData();
    this.editInitialization()
  }
  formInitialization() {
    this.addUserForm = this.fb.group({
      name: [''],
      email: [''],
    });
  }

  editInitialization(){
    this.editForm=this.fb.group({
      name:[''],
      email:['']
    })
  }

  onSubmit() {
    this.service.create(this.addUserForm.value).subscribe((res) => {
      console.log("Data is submit ")
      this.getData();
      this.addUserForm.reset()
      Swal.fire({
        title:"Your Data Submitted",
        icon:"success"
      })
    })
  }

  getData() {
    this.service.getAllData().subscribe((res) => {
      console.log(res);
      this.data=res;
    });
  }


  deleteData(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDelete(id).subscribe((res) => {
          console.log("Data is deleted!");
          this.getData();
        });
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        );
      }
    });
  }
  

  setFormValue(id:string){
    this.service.getById(id).subscribe((res:any)=>{
      this.editForm.setValue({
        name:res.name,
        email:res.email
      });
      this.id=id
    })
  }

  onUpdate() {
  
    this.service.update(this.editForm.value, this.id).subscribe(
      (res) => {
        console.log("update")
        this.getData();
        this.editForm.reset();
        Swal.fire({
          title:"Your Data Updated!",
          icon:"success"
        })
      }
    )
  }
}