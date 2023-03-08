import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestaoService } from './services/gestao.service';
import { HttpClientModule } from '@angular/common/http';
import { GridFilterPipe } from './utils/smart-search-pipe';



@NgModule({
  declarations: [GridFilterPipe],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [GestaoService],
  exports: [GridFilterPipe]
})
export class SharedModule { }
