import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.component.html',
  styleUrls: ['./gestao.component.scss']
})
export class GestaoComponent implements OnInit {

  public opened: boolean = true;

  public checkRoute: boolean = false;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) { }

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => {
      if (result.matches) {
        const drawer = document.querySelector('mat-drawer[drawerName="sidenav"]');
        if (drawer) {
          drawer.classList.remove('mat-drawer-opened');
        }
      }
    });
  }

  isScreenSmall(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 800px)');
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  goOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }

}
