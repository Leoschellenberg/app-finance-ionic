import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private menu: MenuController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.menu.swipeGesture(true);
  }

  async logout() {
    try {
      await this.authService.logout();
    } catch (err) {
      console.error(err);
    }
  }
}
