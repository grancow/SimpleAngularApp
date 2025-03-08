import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { Role } from '../../core/enums/roles.enum';
import { AuthService } from '../../core/services/auth.service';

@Directive({
  selector: '[hasRole]',
})
export class HasRoleDirective implements OnInit {
  @Input('hasRole') roles!: Role | Role[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const requiredRoles = Array.isArray(this.roles) ? this.roles : [this.roles];

    this.authService.hasAnyRole(requiredRoles).subscribe((hasRole) => {
      this.viewContainer.clear();
      if (hasRole) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
