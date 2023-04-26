import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-inner-page-banner',
  templateUrl: './inner-page-banner.component.html',
  styleUrls: ['./inner-page-banner.component.css']
})
export class InnerPageBannerComponent implements OnInit {

  @Input() title!: string

  links: { link: string, value: string }[] = []

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const urls = this.router.url.split('/').filter(value => value !== '')
    for (let i = 0; i < urls.length; i++) {
      if (i == 0) {
        this.links.push({
          link: `/${urls[i]}`,
          value: this.getValue(urls[i])
        })
      } else {
        this.links.push({
          link: `${this.links[i - 1]}/${urls[i]}`,
          value: this.getValue(urls[i])
        })
      }
    }
    console.log(this.links)
  }

  getValue(value: string) {
    let result
    switch (value) {
      case 'ingredients': {
        result = 'Ингредиенты'
        break
      }
      case 'recipes': {
        result = 'Рецепты'
        break
      }
      case 'registration': {
        result = 'Регистрация'
        break
      }
      default: {
        result = value
      }
    }
    return result
  }

}
