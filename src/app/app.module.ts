import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FronteggAppModule, FronteggComponent } from '@frontegg/angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShowAdminPortalComponent } from './show-admin-portal.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, DashboardComponent, ShowAdminPortalComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,

    /** 1. Import Frontegg Module **/
    FronteggAppModule.forRoot(
      {
        contextOptions: {
          baseUrl: "https://app-xxx.frontegg.com", // Replace with Login URL from Frontegg Portal ➜ [ENVIRONMENT] ➜ Env Settings page (remove "/oauth" from the path!)
          clientId: "clientId", // Replace with Client ID from Frontegg Portal ➜ [ENVIRONMENT] ➜ Env Settings page
          tenantResolver: () => {
            const urlParams = new URLSearchParams(window.location.search);
            return { tenant: urlParams.get('organization') };
          },
        },
        authOptions: {
          enableSessionPerTenant: true, // enables separate sessions for each new tab
          keepSessionAlive: true // Uncomment this in order to maintain the session alive
        },
        hostedLoginBox: false,
      }
    ),
  ],

  /** 2. Add Frontetgg Component to your entryComponents **/
  entryComponents: [FronteggComponent],

  bootstrap: [AppComponent],
})
export class AppModule { }
