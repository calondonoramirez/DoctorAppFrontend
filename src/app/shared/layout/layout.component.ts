import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  username: string = '';

  constructor(private router: Router, private shareService: SharedService) {
  }

  ngOnInit(): void {
    const userToken = this.shareService.getSession();

    if(userToken != null){
      this.username = userToken.userName;
    }
  }

  closeSession(){
    this.shareService.deleteSession();
    this.router.navigate(['login']);
  }

}
