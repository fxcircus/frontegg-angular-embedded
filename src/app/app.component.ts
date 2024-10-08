import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FronteggAppService, FronteggAuthService } from '@frontegg/angular';
import { ITeamUserRole } from '@frontegg/rest-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = true;
  loadingSubscription: Subscription;
  user?: any;
  selectedTenantId: string = '';
  tenantState?: any;

  constructor(
    private fronteggAuthService: FronteggAuthService,
    private fronteggAppService: FronteggAppService
  ) {
    this.loadingSubscription = this.fronteggAppService.isLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }

  ngOnInit(): void {
    this.fronteggAuthService.teamState$.subscribe((teamState) => {
      const newRoles: ITeamUserRole[] = teamState.roles.filter((role: ITeamUserRole) => role.name !== 'New');
      this.fronteggAuthService.setTeamState({ roles: newRoles });
    });

    this.fronteggAuthService.user$.subscribe((user) => {
      this.user = user;
      this.updateSelectedTenantId();
    });

    this.fronteggAuthService.loadTenants();
    this.fronteggAuthService.tenantsState$.subscribe((tenants) => {
      this.tenantState = tenants;
      console.log('Tenant State Loaded:', this.tenantState);
      this.updateSelectedTenantId();
    });
  }

  private updateSelectedTenantId() {
    // Ensure both user and tenantState are loaded
    if (this.user && this.tenantState) {
      const activeTenant = this.tenantState.tenants.find((tenant: any) => tenant.tenantId === this.user.tenantId);
      if (activeTenant) {
        this.selectedTenantId = activeTenant.tenantId;
      }
    }
  }

  switchTenant(): void {
    console.log('Switching to Tenant ID:', this.selectedTenantId);  // Log the tenant ID on switch
    this.fronteggAuthService.switchTenant({ tenantId: this.selectedTenantId });
  }

  logIn(): void {
    window.location.href = "/account/login";
  }

  logOut(): void {
    sessionStorage.removeItem('FRONTEGG_SEPARATE_TABS_BY_TENANT');
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/account/logout`;
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  refreshToken(): void {
    this.fronteggAuthService.requestAuthorize();
  }
}
