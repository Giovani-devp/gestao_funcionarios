import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormFiltrosComponent } from './components/form-filtros-gerais/form-filtros.component';
import { GestaoRoutingModule } from './gestao-routing.module';
import { GestaoComponent } from './gestao.component';

import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FiltroFuncionarioComponent } from './components/filtro-funcionario/filtro-funcionario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    GestaoComponent,
    FormFiltrosComponent,
    HeaderComponent,
    FiltroFuncionarioComponent
  ],
  imports: [
    MatTooltipModule,
    CommonModule,
    GestaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    SharedModule,
    DatePipe,
    NgxPaginationModule,
    // MatTooltipModule
    MatPaginatorModule
  ],
  providers: [MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    DatePipe
  ],
  exports: [FormFiltrosComponent, FiltroFuncionarioComponent],
})
export class GestaoModule { }
