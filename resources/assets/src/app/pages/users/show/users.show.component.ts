import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {ApiService} from '../../../api/api.service';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../users.service';
import {User} from '../../../models/user.model';
import { Role } from '../../../models/role.model';
import {ItemsShowComponent} from '../../items.show.component';
import {AllowedActionsService} from '../../roles/allowed-actions.service';

type UserWithRole = User & { role?: Role };

@Component({
    selector: 'app-users-show',
    templateUrl: './users.show.component.html',
    styleUrls: ['../../items.component.scss']
})
export class UsersShowComponent extends ItemsShowComponent implements OnInit {

    public item: UserWithRole = new User();
    public roleName = '';

    constructor(api: ApiService,
                userService: UsersService,
                router: ActivatedRoute,
                allowService: AllowedActionsService,
                protected translate: TranslateService,
    ) {
        super(api, userService, router, allowService);
    }

    ngOnInit() {
        this.sub = this.router.params.subscribe(params => {
            this.id = +params['id'];
        });

        this.itemService.getItem(this.id, this.setItem.bind(this), {
            with: 'role',
        });
    }

    setItem(result) {
        super.setItem(result);

        if (result.role) {
            this.translate.get(`role.name.${result.role.name}`).subscribe((value: string) => {
                // Just use role name, if it is not translated.
                this.roleName = !value.startsWith('role.name.') ? value : result.role.name;
            });
        }
    }
}
