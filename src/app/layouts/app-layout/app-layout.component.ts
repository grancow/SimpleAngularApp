import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/auth/auth.selectors';
import { MenuItem, MenuService } from '../../core/menu.service';
import { logout } from '../../state/auth/auth.actions';
import { User } from '../../core/models/user.interface';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  menu: MenuItem[] = [];
  user: User | null = null;
  hasAccessToMenu: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private menuService: MenuService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.select(selectUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe((user) => {
      this.user = user || null;
      if (user) {
        this.menuService.getMenuForRole().subscribe((menuItems) => {
          const realMenuItems = menuItems.filter(item => item.roles.length > 0);
          this.menu = realMenuItems;
          this.hasAccessToMenu = realMenuItems.length > 0;
        });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/']);
  }
}
