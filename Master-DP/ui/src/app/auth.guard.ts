import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { of } from "rxjs";
import { AuthService } from "src/service/auth.service";

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate {

   constructor(private authService: AuthService, private router: Router) {}

   canActivate(
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): boolean | UrlTree {
      let roles = route.data["roles"] as Array<string>;
          return this.checkLogin(roles);
      }

      checkLogin(roles): any {
         if(this.authService.getUser()){
            if(roles.includes(this.authService.getUser().type)){
               return true
            }
            else {
               this.router.navigateByUrl('/')
            }
         }
         else {
            return this.router.parseUrl('/login');
         }
      
      }
}