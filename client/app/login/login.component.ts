import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {AlertService} from "../alert.service";
import {UserService} from "../user.service";
import {User} from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    users: User[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,

        private userService: UserService
    ) { }

    ngOnInit() {
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

}
