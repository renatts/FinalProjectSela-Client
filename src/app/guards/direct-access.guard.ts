import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DirectAccessService } from '../services/direct-access.service';

@Injectable({
  providedIn: 'root',
})
export class DirectAccessGuard implements CanActivate {
  constructor(
    private router: Router,
    private accessService: DirectAccessService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.accessService.isClicked) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
