import ChildComponent from "@/core/component/child-screen.component";
import RenderService from "@/core/services/render.service";
import template from './field.template.html'
import styles from './field.module.scss'
import { $M } from "@/core/mquery/mquery.lib";

export class Field extends ChildComponent {
    constructor({ placeholder, type = 'text', value = '', name, variant, id}){
        super()

        if(!name) throw new Error('Please fill field name!')

        this.placeholder = placeholder
        this.type = type
        this.value = value
        this.name = name
        this.variant = variant
        this.id = id
    }

    render(){
        this.element = RenderService.htmlToElement(template, [], styles);

        const inputElement = $M(this.element).find('input').input({
            placeholder: this.placeholder,
            type: this.type,
            value: this.value,
            name: this.name,
            id: this.id
        })

        if(this.type === 'number') {
            inputElement.numberInput()
        }

        const isCreditCard = this.variant === 'credit-card'

        if(isCreditCard) {
            inputElement.creditCardInput()
        }

        return this.element;
    }
}
