import {Component, DoCheck, IterableDiffers, OnInit} from '@angular/core';
import {ApiService} from '../../../api/api.service';
import {TasksService} from '../tasks.service';
import {Task} from '../../../models/task.model';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ItemsListComponent} from '../../items.list.component';
import {AllowedActionsService} from '../../roles/allowed-actions.service';
import {ProjectsService} from '../../projects/projects.service';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks.list.component.html',
    styleUrls: ['../../items.component.scss']
})
export class TasksListComponent extends ItemsListComponent implements OnInit, DoCheck {

    itemsArray: Task[] = [];
    p = 1;
    userId: number = null;
    projectId: number = null;
    differUser: any;
    differProject: any;
    directProject: any = [];
    requestTasks: Subscription = new Subscription();
    requestProjects: Subscription = new Subscription();

    constructor(api: ApiService,
                taskService: TasksService,
                modalService: BsModalService,
                allowedService: AllowedActionsService,
                differs: IterableDiffers,
                protected projectService: ProjectsService
    ) {
        super(api, taskService, modalService, allowedService);
        this.differUser = differs.find([]).create(null);
        this.differProject = differs.find([]).create(null);
    }

    ngOnInit() {
    }

    setProjects(result) {
        const items = [];
        result.forEach(function (item) {
            items.push(item.id);
            return item;
        });
        this.directProject = items;
    }

    ngDoCheck() {
        const changeUserId = this.differUser.diff([this.userId]);
        const changeProjectId = this.differProject.diff([this.projectId]);
        const filter = {'with': 'project'};

        if (changeUserId || changeProjectId) {
            if (this.userId) {
                filter['user_id'] = ['=', this.userId];
            }

            if (this.projectId) {
                filter['project_id'] = ['=', this.projectId];
            }
            if (this.requestTasks.closed !== undefined && !this.requestTasks.closed) {
                this.requestTasks.unsubscribe();
            }
            this.requestTasks = this.itemService.getItems(this.setItems.bind(this), this.userId ? {'user_id': ['=', this.userId]} : null);
            if (this.requestProjects.closed !== undefined && !this.requestProjects.closed) {
                this.requestProjects.unsubscribe();
            }
            this.requestProjects = this.projectService.getItems(this.setProjects.bind(this), this.can('/projects/full_access') ? [] : {'direct_relation': 1});
        }
    }
}
