import { TestBed } from '@angular/core/testing'

import { InformationMessageService } from './information-message.service'

describe('InformationMessageService', () => {
  let service: InformationMessageService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(InformationMessageService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
