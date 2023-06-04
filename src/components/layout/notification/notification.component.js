import ChildComponent from "@/core/component/child-screen.component";import RenderService from "@/core/services/render.service";
import template from './notification.template.html'
import styles from './notification.module.scss'
import { $M } from "@/core/mquery/mquery.lib";
import { NotificationService } from "@/core/services/notification.service";
import { StorageService } from "@/core/services/storage.service";

export class Notification extends ChildComponent {
    render(){
        this.element = RenderService.htmlToElement(template, [], styles);

        window.storageService = new StorageService
        
        return this.element;
    }
}
