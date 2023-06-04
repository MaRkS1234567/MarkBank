import ChildComponent from "@/core/component/child-screen.component";import RenderService from "@/core/services/render.service";
import template from './home.template.html'
import styles from './home.module.scss'
import { $M } from "@/core/mquery/mquery.lib";

export class <FTName | pascalcase> extends ChildComponent {
    render(){
        this.element = RenderService.htmlToElement(template, [], styles);

        return this.element;
    }
}
