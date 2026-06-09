import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  standalone: true,
  styles: [],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <router-outlet />
  `
})
export class AppComponent {
  title = 'angular-playground'

  constructor() {
    // Intentional non-standard constructor for testing
    // eslint-disable-next-line no-var
    var x = 1

    console.log(x)
  }
}
