import ChildComponent from "@/core/component/child-screen.component";
import RenderService from "@/core/services/render.service";
import template from './auth.template.html'
import styles from './auth.module.scss'
import { $M } from "@/core/mquery/mquery.lib";
import { BaseScreen } from "@/core/component/base-screen.component";
import { Heading } from "@/components/ui/heading/heading.component";
import { Button } from "@/components/ui/button/button.component";
import { Field } from "@/components/ui/field/field.component";
import formService from "@/core/services/form.service";
import { AuthService } from "@/api/auth.service";
import validationService from "@/core/services/validation.service";

export class Auth extends BaseScreen {
    #isTypeLogin = true

    constructor(title){
        super({title: 'auth'})
        this.authService = new AuthService()
    }

    #validateFields(formValues){
        const emailLabel = $M(this.element).find('input:first-child')
        const passwordLabel = $M(this.element).find('#second')

        if (!formValues.email){
            validationService.showError(emailLabel)
        }

        if (!formValues.password){
            validationService.showError(passwordLabel)
        }

        return formValues.email && formValues.password
    }

    #handleSubmit = event => {
        const formValues = formService.getFormValues(event.target)

        if(!this.#validateFields(formValues)) return
        
        const type = this.#isTypeLogin ? 'login' : 'register'
        this.authService.main(type, formValues)
    }

    #changeFormType = event => {
        event.preventDefault()


        $M(this.element).find('h1').text(this.#isTypeLogin ? 'Register': 'Sign In')

        $M(event.target).text(this.#isTypeLogin ? 'Sign In' : 'Register')
        this.#isTypeLogin = !this.#isTypeLogin
    }

    render(){
        this.element = RenderService.htmlToElement(template, [
            new Button({ children: 'Submit' })
        ], styles);

        $M(this.element)
            .find('#auth-inputs')
            .append(
                new Field({
                    placeholder: 'Enter email',
                    name: 'email',
                    type: 'email'
                }).render()
            )
            .append(
                new Field({
                    placeholder: 'Enter password',
                    name: 'password',
                    type: 'password',
                    id: 'second'
                }).render()
            )

        $M(this.element)
            .find('#change-form-type')
            .click(this.#changeFormType)

        $M(this.element).find('form').submit(this.#handleSubmit)

        return this.element;
    }
}
