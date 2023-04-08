import { Component } from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout'
import { ResolveEnd, ResolveStart, Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isResolving: boolean = false
  title: string = 'INBAR'

  constructor(private observer: BreakpointObserver,
              private router: Router) {
    router.events.subscribe(e => {
      if (e instanceof ResolveStart) {
        this.isResolving = true
      } else if (e instanceof ResolveEnd) {
        this.isResolving = false
      }
    })
  }
}
