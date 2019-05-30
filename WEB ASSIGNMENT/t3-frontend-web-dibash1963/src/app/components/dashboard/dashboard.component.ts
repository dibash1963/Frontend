import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
  	private router: Router) { }

  ngOnInit() {
  		const currentUser = localStorage.getItem('currentUser');
        
        if(currentUser == null){
            this.router.navigate(['/login']);
        }
  }

}
