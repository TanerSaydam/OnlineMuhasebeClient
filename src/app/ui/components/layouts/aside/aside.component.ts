import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginReponseModel } from '../../auth/models/login-response.model';
import { Navigations } from 'src/app/ui/router/navigation';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  @Input() loginResponse: LoginReponseModel = new LoginReponseModel();

  navigations = Navigations;   
}
