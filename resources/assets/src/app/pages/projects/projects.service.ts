import {EventEmitter, Injectable, Output} from '@angular/core';
import {ApiService} from "../../api/api.service";
import {Project} from "../../models/project.model";
import {ItemsService} from "../items.service";

@Injectable()
export class ProjectsService extends ItemsService {

    constructor(api: ApiService) {
        super(api);
    }

    getApiPath() {
        return 'projects';
    }

    convertFromApi(itemFromApi) {
        console.log(itemFromApi);
        return new Project(itemFromApi)
    }

}