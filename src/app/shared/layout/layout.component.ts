import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  username: string = '';

  constructor(private router: Router, private shareService: SharedService,
              private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    const userSession = this.shareService.getSession();

    if(userSession != null){
      this.username = userSession;
    }
  }

  closeSession(){
    this.shareService.deleteSession();
    this.cookieService.delete('Authorization', '/');
    this.router.navigate(['login']);
  }

}
