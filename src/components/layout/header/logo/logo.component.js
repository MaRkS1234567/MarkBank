import ChildComponent from "@/core/component/child-screen.component";import RenderService from "@/core/services/render.service";
import template from './logo.template.html'
import styles from './logo.module.scss'
import { $M } from "@/core/mquery/mquery.lib";

export class Logo extends ChildComponent {
    render(){
        this.element = RenderService.htmlToElement(template, [], styles);

        return this.element;
    }
}
