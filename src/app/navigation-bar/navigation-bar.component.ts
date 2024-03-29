import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NotificationComponent } from '../notification/notification.component';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  isAuthenticated = false; 
  notifications:any = [] as any; 
  
  private userSub!: Subscription; 
  userData: {
    email: string;
    id: string;
    lender: boolean;
  } = JSON.parse(localStorage.getItem('userData') || '{}');

  lender = this.userData.lender;
  participant = false;

  constructor(private authService: AuthService,
              public notificationService: NotificationComponent,
              private HttpClient: HttpClient
              ) { }


  /**
   * Initial code ran when component is loaded. 
   * In this case, verifies that the logged in 
   * user is authenticated and loads all user
   * notifications.
   */
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    }); 
    if (this.isAuthenticated){
      this.load_notifications()
    }

    if(this.authService.user.getValue()){
      const params = new HttpParams().append('user_id', this.authService.user.getValue()!.id);
      this.HttpClient.get<any>(
        '/api/get-participant',
        {
          params
        }
      ).subscribe(resData => {
        if (resData.Participant) {
          this.participant = true;
        }
      });
    }

  }

  /**
   * A callback method that performs custom clean-up, 
   * invoked immediately before a directive, pipe, or 
   * service instance is destroyed.
   */
  ngOnDestroy(): void {
    this.userSub.unsubscribe(); 
  }

  /**
   * Method called when a user requests to log out. 
   * Calls the logout method within the authenticate
   * service component and sets user as not authenticated.
   */
  onLogout() {
    this.authService.logout(); 
    this.isAuthenticated = false; 
  }

  /**
   * Calls the notification service component in order
   * to retrieve all the notifications corresponding to 
   * the logged in user and saves them within the 'notifications'
   * instance variable.
   */
  load_notifications(){
    this.notifications = this.notificationService.get_notifications(); 
  }
}
