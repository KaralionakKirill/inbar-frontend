import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InnerPageBannerComponent } from './inner-page-banner.component'

describe('InnerPageBannerComponent', () => {
  let component: InnerPageBannerComponent
  let fixture: ComponentFixture<InnerPageBannerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerPageBannerComponent ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(InnerPageBannerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
