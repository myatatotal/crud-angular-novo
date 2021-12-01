import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../service.service';
import { EmployeeModel } from '../model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employees: any;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      vara: [''],
      processo: [''],
      nome: [''],
      datas: [''],
      tipo: [''],
      escritorio: [''],
    });
    this.getAllEmployees();
  }

  addEmployeeClick() {
    this.formValue.reset();
    this.isEditing = false;
  }

  closeModal() {
    const btnCancel = document.getElementById('cancel');
    btnCancel.click();
    this.formValue.reset();
  }

  createEmployee() {
    this.employeeModelObj.vara = this.formValue.value.vara;
    this.employeeModelObj.processo = this.formValue.value.processo;
    this.employeeModelObj.nome = this.formValue.value.nome;
    this.employeeModelObj.datas = this.formValue.value.datas;
    this.employeeModelObj.tipo = this.formValue.value.tipo;
    this.employeeModelObj.escritorio = this.formValue.value.escritorio;
    this.api.create(this.employeeModelObj).subscribe(
      (rest) => {
        this.closeModal();
        this.getAllEmployees();
        alert('Employee Created');
      },
      (error) => {
        alert('Error to create employee');
      }
    );
  }

  getAllEmployees() {
    this.api.getMany().subscribe((resp) => {
      this.employees = resp;
    });
  }

  deleteEmployee(id: string) {
    this.api.delete(id).subscribe((resp) => {
      this.getAllEmployees();
      alert('Employee Deleted');
    });
  }

  editEmployee(employee: EmployeeModel) {
    this.isEditing = true;
    this.employeeModelObj.id = employee.id;
    this.formValue.controls['vara'].setValue(employee.vara);
    this.formValue.controls['processo'].setValue(employee.processo);
    this.formValue.controls['nome'].setValue(employee.nome);
    this.formValue.controls['datas'].setValue(employee.datas);
    this.formValue.controls['tipo'].setValue(employee.tipo);
    this.formValue.controls['escritorio'].setValue(employee.escritorio);
  }

  updateEmployee() {
    this.employeeModelObj.vara = this.formValue.value.vara;
    this.employeeModelObj.processo = this.formValue.value.processo;
    this.employeeModelObj.nome = this.formValue.value.nome;
    this.employeeModelObj.datas = this.formValue.value.datas;
    this.employeeModelObj.tipo = this.formValue.value.tipo;
    this.employeeModelObj.escritorio = this.formValue.value.escritorio;
    this.api
      .update(this.employeeModelObj.id, this.employeeModelObj)
      .subscribe((resp) => {
        this.closeModal();
        this.getAllEmployees();
        alert('Update success');
      });
  }

}
