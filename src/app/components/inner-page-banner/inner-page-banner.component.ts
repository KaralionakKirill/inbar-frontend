import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-inner-page-banner',
  templateUrl: './inner-page-banner.component.html',
  styleUrls: ['./inner-page-banner.component.css']
})
export class InnerPageBannerComponent {

  @Input() title!: string
  @Input() subTitle: string | null = null
  @Input() link: string | null = null

}
