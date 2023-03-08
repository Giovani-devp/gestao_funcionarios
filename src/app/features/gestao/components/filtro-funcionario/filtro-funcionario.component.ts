import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { take } from 'rxjs';
import { GestaoService } from 'src/app/shared/services/gestao.service';
import { IworkSheet } from '../../models/work-sheet.model';

@Component({
  selector: 'app-filtro-funcionario',
  templateUrl: './filtro-funcionario.component.html',
  styleUrls: ['./filtro-funcionario.component.scss']
})
export class FiltroFuncionarioComponent implements OnInit {

  public page = 1;
  public count = 0;
  public tableSize = 10;
  public tableSizes = [5, 10, 15, 20];
  public lastPage: any;

  public formFuncionario!: FormGroup;

  public show: boolean = false;

  public isLoading: boolean = false;

  public buttonName: string = 'Mostrar...';

  public data: IworkSheet[];

  public resultado: any;

  public somaHoraEstimada: number = 0;
  public somahoraRegistrada: number = 0;

  constructor(
    private fb: FormBuilder,
    private mockGestaoService: GestaoService,
    private datePipe: DatePipe
  ) {
    this.data = [];
  }

  ngOnInit(): void {
    this.formFuncionario = this.fb.group({
      recurso: [''],
    })
    this.getAllData();
  }

  getAllData() {
    this.isLoading = true;
    this.mockGestaoService.getAllData()
      .subscribe((response: any) => {
        this.data = response.data;
        this.isLoading = false;
      });
  }

  filtro = (filtro: { recurso: string }) => {
    const filteredData = this.data.filter((task) => {
      if (task.recurso && typeof task.recurso === 'string' && task.recurso.trim() !== '') {
        const recursoMatch = task.recurso.toLowerCase().indexOf(filtro.recurso.toLowerCase()) !== -1;
        return recursoMatch;
      }
      return false;
    });
    const somaHoraEstimada = filteredData.reduce((acc, task) => acc + (task.horaEstimada ?? 0), 0);
    const somahoraRegistrada = filteredData.reduce((acc, task) => acc + (task.horaRegistrada ?? 0), 0);
    return { tarefas: filteredData, somaHoraEstimada: somaHoraEstimada.toFixed(2), somahoraRegistrada: somahoraRegistrada.toFixed(2) };
  };

  onClickSearch() {
    this.isLoading = true;
    console.log(this.formFuncionario.value);
    const filtroResult = this.filtro(this.formFuncionario.value);
    this.resultado = filtroResult.tarefas;
    this.somaHoraEstimada = Number(filtroResult.somaHoraEstimada);
    this.somahoraRegistrada = Number(filtroResult.somahoraRegistrada);
    console.log(this.resultado);
    this.resetForm();
    this.setLastPage();
    this.isLoading = false;
  };

  resetForm() {
    this.ngOnInit();
  }

  changePaginationSize(event: any) {
    this.tableSize = event;
    this.setLastPage();
  }

  setLastPage(): void {
    this.lastPage = Math.floor(this.resultado.length / this.tableSize);
    return this.resultado.length % this.tableSize === 0 ? this.lastPage : this.lastPage++;
  }

  onTableDataChange(event?: any) {
    this.page = event;
  }

  onTableSizeChange(event?: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

}
