import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAcoesComponent } from './grid-acoes.component';


describe('GridAcoesComponent', () => {
  let component: GridAcoesComponent;
  let fixture: ComponentFixture<GridAcoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAcoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
