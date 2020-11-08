import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemAcoesComponent } from './listagem-acoes.component';


describe('ListagemAcoesComponent', () => {
  let component: ListagemAcoesComponent;
  let fixture: ComponentFixture<ListagemAcoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemAcoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemAcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
