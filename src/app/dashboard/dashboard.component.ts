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

  panelOpenState = false;

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      vara: [''],
      processo: [''],
      nome: [''],
      datas: [''],
      tipo: [''],
      escritorio: [''],
      subclasse: [''],
      NovaVara: [''],
      NovoProcesso: [''],
      NovoNome: [''],
      TipoPlano: [''],
      NumeroMatricula: [''],
      DataConsulta: [''],
      SaldoPlano: [''],
      DataNascimentoParticipante: [''],
      NomeResponsavelFinanceiro: [''],
      CPFResposavelFinanceiro: [''],
      SituacaoPlano: [''],
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
    this.employeeModelObj.subclasse = this.formValue.value.subclasse;
    this.employeeModelObj.NovaVara = this.formValue.value.NovaVara;
    this.employeeModelObj.NovoProcesso = this.formValue.value.NovoProcesso;
    this.employeeModelObj.NovoNome = this.formValue.value.NovoNome;
    this.employeeModelObj.TipoPlano = this.formValue.value.TipoPlano;
    this.employeeModelObj.NumeroMatricula = this.formValue.value.NumeroMatricula;
    this.employeeModelObj.DataConsulta = this.formValue.value.DataConsulta;
    this.employeeModelObj.SaldoPlano = this.formValue.value.SaldoPlano;
    this.employeeModelObj.DataNascimentoParticipante = this.formValue.value.DataNascimentoParticipante;
    this.employeeModelObj.NomeResponsavelFinanceiro = this.formValue.value.NomeResponsavelFinanceiro;
    this.employeeModelObj.CPFResposavelFinanceiro = this.formValue.value.CPFResposavelFinanceiro;
    this.employeeModelObj.SituacaoPlano = this.formValue.value.SituacaoPlano;
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
    this.formValue.controls['subclasse'].setValue(employee.subclasse);
    this.formValue.controls['NovaVara'].setValue(employee.NovaVara);
    this.formValue.controls['NovoProcesso'].setValue(employee.NovoProcesso);
    this.formValue.controls['NovoNome'].setValue(employee.NovoNome);
    this.formValue.controls['TipoPlano'].setValue(employee.TipoPlano);
    this.formValue.controls['NumeroMatricula'].setValue(employee.NumeroMatricula);
    this.formValue.controls['DataConsulta'].setValue(employee.DataConsulta);
    this.formValue.controls['SaldoPlano'].setValue(employee.SaldoPlano);
    this.formValue.controls['DataNascimentoParticipante'].setValue(employee.DataNascimentoParticipante);
    this.formValue.controls['NomeResponsavelFinanceiro'].setValue(employee.NomeResponsavelFinanceiro);
    this.formValue.controls['CPFResposavelFinanceiro'].setValue(employee.CPFResposavelFinanceiro);
    this.formValue.controls['SituacaoPlano'].setValue(employee.SituacaoPlano);
  }

  updateEmployee() {
    this.employeeModelObj.vara = this.formValue.value.vara;
    this.employeeModelObj.processo = this.formValue.value.processo;
    this.employeeModelObj.nome = this.formValue.value.nome;
    this.employeeModelObj.datas = this.formValue.value.datas;
    this.employeeModelObj.tipo = this.formValue.value.tipo;
    this.employeeModelObj.escritorio = this.formValue.value.escritorio;
    this.employeeModelObj.subclasse = this.formValue.value.subclasse;
    this.employeeModelObj.NovaVara = this.formValue.value.NovaVara;
    this.employeeModelObj.NovoProcesso = this.formValue.value.NovoProcesso;
    this.employeeModelObj.NovoNome = this.formValue.value.NovoNome;
    this.employeeModelObj.TipoPlano = this.formValue.value.TipoPlano;
    this.employeeModelObj.NumeroMatricula = this.formValue.value.NumeroMatricula;
    this.employeeModelObj.DataConsulta = this.formValue.value.DataConsulta;
    this.employeeModelObj.SaldoPlano = this.formValue.value.SaldoPlano;
    this.employeeModelObj.DataNascimentoParticipante = this.formValue.value.DataNascimentoParticipante;
    this.employeeModelObj.NomeResponsavelFinanceiro = this.formValue.value.NomeResponsavelFinanceiro;
    this.employeeModelObj.CPFResposavelFinanceiro = this.formValue.value.CPFResposavelFinanceiro;
    this.employeeModelObj.SituacaoPlano = this.formValue.value.SituacaoPlano;
    this.api
      .update(this.employeeModelObj.id, this.employeeModelObj)
      .subscribe((resp) => {
        this.closeModal();
        this.getAllEmployees();
        alert('Update success');
      });
  }

}
