import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GestaoService } from 'src/app/shared/services/gestao.service';
import { IworkSheet } from '../../models/work-sheet.model';

@Component({
  selector: 'app-form-filtros',
  templateUrl: './form-filtros.component.html',
  styleUrls: ['./form-filtros.component.scss']
})
export class FormFiltrosComponent implements OnInit {

  //pagination config:
  public page = 1;
  public count = 0;
  public tableSize = 10;
  public tableSizes = [5, 10, 15, 20];
  public skeletonCount: number = 7;
  public lastPage: any;

  public formFilters!: FormGroup;

  public show: boolean = false;

  public isLoading: boolean = false;

  public buttonName: string = 'Mostrar...';

  public data: IworkSheet[];

  public resultado: any;

  public searchText: any;

  public panelExpandido: boolean = false;

  constructor(
    private fb: FormBuilder,
    private mockGestaoService: GestaoService,
    private datePipe: DatePipe,
  ) {
    this.data = [];
  }

  ngOnInit(): void {
    this.formFilters = this.fb.group({
      task: [''],
      empresa: [''],
      statusTask: [''],
      aprovador: [''],
      criacaoTask: [''],
      dataAtivacao: [''],
      dataResolvido: [''],
      dataFechado: [''],
    })
    this.getAllData();
  }

  toggle() {
    this.show = !this.show;

    if (this.show)
      this.buttonName = "Esconder...";
    else
      this.buttonName = "Mostrar...";
  }

  getAllData() {
    this.isLoading = true;
    this.mockGestaoService.getAllData()
      .subscribe((response: any) => {
        this.data = response.data;
        console.log(this.data);
        
        this.isLoading = false;
      });
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

  filter({ task, empresa, statusTask, aprovador, criacaoTask, dataAtivacao, dataResolvido, dataFechado }: {
    task: string,
    empresa: string,
    statusTask: string,
    aprovador: string,
    criacaoTask: string,
    dataAtivacao: string,
    dataResolvido: string,
    dataFechado: string
  }) {
    const comparar = (campo: string, valor: string) =>
      campo.toLowerCase().includes(valor.toLowerCase());

    return this.data.filter((tarefa: any) =>
      comparar(String(tarefa.task), task) &&
      comparar(tarefa.empresa, empresa) &&
      comparar(tarefa.statusTask, statusTask) &&
      comparar(tarefa.aprovador, aprovador) &&
      comparar(tarefa.criacaoTask, this.datePipe.transform(criacaoTask, 'dd/MM/yyyy') || '') &&
      comparar(tarefa.dataAtivacao, this.datePipe.transform(dataAtivacao, 'dd/MM/yyyy') || '') &&
      comparar(tarefa.dataResolvido, this.datePipe.transform(dataResolvido, 'dd/MM/yyyy') || '') &&
      comparar(tarefa.dataFechado, this.datePipe.transform(dataFechado, 'dd/MM/yyyy') || '')
    ).map(({ task, empresa, projeto, recurso, userStory, statusTask, criacaoTask, aprovador, dataAtivacao, dataResolvido, dataFechado }) => ({
      task, empresa, projeto, userStory, statusTask, recurso, aprovador, criacaoTask, dataAtivacao, dataResolvido, dataFechado
    }));
  }

  onClickSearch() {
    this.isLoading = true;
    console.log(this.formFilters.value);
    this.resultado = this.filter(this.formFilters.value)
    console.log(this.resultado);
    this.resetForm();
    this.setLastPage();
    this.isLoading = false;
  };

  resetForm() {
    this.ngOnInit();
  }


}
