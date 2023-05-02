import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'authentication';
  isadmin = false;
  isMenuVisible = false;
  userName=''
  constructor(private route: Router) {
  }
  ngDoCheck(): void {
    this.userName = sessionStorage.getItem('username')!
    let currentroute = this.route.url;
    if (currentroute == '/auth') {
      this.isMenuVisible = false
    } else {
      this.isMenuVisible = true
    }
  }
  salir() {
    this.isMenuVisible = false
  }
}
