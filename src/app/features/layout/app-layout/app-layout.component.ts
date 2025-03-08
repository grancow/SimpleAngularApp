import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuService } from '../../../core/services/menu.service';
import { selectUser } from '../../../store/session.selectors';
import { endSession } from '../../../store/session.actions';
import { Router } from '@angular/router';

interface MenuItem {
  label: string;
  path?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  menu: MenuItem[] = [];
  userName: string = '';
  hasMenuItems: boolean = false;

  constructor(
    private menuService: MenuService, 
    private store: Store, 
    private router: Router
  ) {}

  ngOnInit() {
    this.store.select(selectUser).subscribe(user => {
      if (user) {
        this.userName = user.name;
        this.menuService.getMenuForRole().subscribe(menu => {
          this.menu = menu;
          this.hasMenuItems = menu.length > 0;
        });
      }
    });
  }

  logout() {
    this.store.dispatch(endSession());
    this.router.navigate(['/']);  // Przekierowanie na stronę główną
  }

  trackByLabel(index: number, item: MenuItem) {
    return item.label;
  }
}
