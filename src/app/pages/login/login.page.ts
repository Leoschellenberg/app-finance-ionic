import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userLogin: User = {};
  public loading: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router,
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
  }

 async login() {
   await this.presentLoading();

   try {
    await this.authService.login(this.userLogin);
  } catch (err) {
    console.error(err);

    this.presentToast(err.message);
  }finally {
    this.loading.dismiss();
  }
  }

  navigate(){
    this.router.navigate(['/register']);
  }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
