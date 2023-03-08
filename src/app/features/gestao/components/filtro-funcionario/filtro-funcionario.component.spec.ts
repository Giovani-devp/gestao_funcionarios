import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroFuncionarioComponent } from './filtro-funcionario.component';

describe('FiltroFuncionarioComponent', () => {
  let component: FiltroFuncionarioComponent;
  let fixture: ComponentFixture<FiltroFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroFuncionarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
