import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { COMPONENT_FACTORY_RESOLVER } from '@angular/core/src/render3/ng_module_ref';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  accessThroughTheCode: boolean;
  public constructor(private _router: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = localStorage.getItem("currentUser");
    if (user && this.accessThroughTheCode) { //if user logged
      if (next.data.role == "admin")         //if required manager
        if (JSON.parse(user).isManager)      //if currnt user is manager
          return true;
        else {
          return false;
        }
      else {
        return true;
      }
    }
    else {
      this._router.navigate(['/login']);  // navigate to login page
      return false;
    }
  }
  stringContainOnlyNumbers(str: string) {
    var numbers = new RegExp(/^[0-9]+$/);
    if (numbers.test(str)) {
      return true;
    }
    else {
      return false;
    }
  }
}
