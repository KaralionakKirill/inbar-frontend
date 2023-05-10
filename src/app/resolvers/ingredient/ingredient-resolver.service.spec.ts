import { TestBed } from '@angular/core/testing'

import { IngredientResolverService } from './ingredient-resolver.service'

describe('IngredientResolverService', () => {
  let service: IngredientResolverService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(IngredientResolverService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
