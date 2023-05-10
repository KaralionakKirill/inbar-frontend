import { ComponentFixture, TestBed } from '@angular/core/testing'

import { IngredientTypesComponent } from './ingredient-types.component'

describe('CategoryComponent', () => {
  let component: IngredientTypesComponent
  let fixture: ComponentFixture<IngredientTypesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientTypesComponent ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(IngredientTypesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
