import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AuthRoute} from './tasks-routing.module';
import {LoginService} from "../../auth/login/login.service";

import {TasksCreateComponent} from './create/tasks.create.component';
import {TasksEditComponent} from './edit/tasks.edit.component';
import {TasksShowComponent} from './show/tasks.show.component';
import {TasksListComponent} from './list/tasks.list.component';

import {HttpClientModule} from '@angular/common/http';
import {TasksService} from "./tasks.service";
import {NgxPaginationModule} from 'ngx-pagination';
import {GrowlModule} from 'primeng/growl';

@NgModule({
    imports: [
        CommonModule,
        AuthRoute,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        GrowlModule
    ],
    declarations: [
        TasksCreateComponent,
        TasksEditComponent,
        TasksListComponent,
        TasksShowComponent,
    ],
    providers: [
        LoginService,
        TasksService
    ]
})

export class TasksModule {
}
