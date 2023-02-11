import { importProvidersFrom } from "@angular/core";
import { bootstrapApplication, BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { AuthGuard } from "./app/ui/components/auth/guards/auth.guard";
import {provideHttpClient} from "@angular/common/http"
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { StoreModule } from "@ngrx/store";
import { loadingReducer } from "./app/common/states/loading/loading-reducer";

bootstrapApplication(AppComponent,{
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule, 
      SweetAlert2Module.forRoot(),     
      StoreModule.forRoot({loading: loadingReducer}),
      RouterModule.forRoot([
        {
          path: "",
          loadComponent: ()=> import("./app/ui/components/layouts/layouts.component").then(c=> c.LayoutsComponent),
          canActivateChild: [AuthGuard],
          children: [
            {
              path: "",
              loadComponent: ()=> import("./app/ui/components/blank/blank.component").then(c=> c.BlankComponent)
            },
            {
              path: "ucafs",
              loadComponent: ()=> import("./app/ui/components/ucafs/ucafs.component").then(c=> c.UcafsComponent)
            },
            {
              path: "reports",
              loadComponent:()=> import("./app/ui/components/reports/reports.component").then(c=> c.ReportsComponent)
            }
          ]
        },
        {
          path: "login",
          loadComponent: ()=> import("./app/ui/components/auth/login/login.component").then(c=> c.LoginComponent)
        }
      ])
    )
  ]
})