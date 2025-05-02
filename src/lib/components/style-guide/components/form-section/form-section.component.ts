import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormComponent } from '../../../form/form.component';
import { FormConfig, FormSection } from '../../../form/models/form-config.model';
import { SelectFormField, SelectOption, TextFormField } from '../../../form/models/form-field.model';

@Component({
    selector: 'ys-form-section',
    standalone: true,
    imports: [CommonModule, TranslateModule, FormComponent],
    templateUrl: './form-section.component.html'
})
export class FormSectionComponent implements OnInit {
    config = new FormConfig({
        prefix: 'angular-components.style-guide.section.form.form',
        header: 'angular-components.style-guide.section.form.form.header.new-user',
        height: '30vh',
        sections: [
            new FormSection({
                key: 'general',
                fields: [
                    [
                        new TextFormField({
                            key: 'name',
                            width: 50,
                            required: true
                        }),
                        new TextFormField({
                            key: 'role',
                            width: 50,
                            required: true,
                            disabled: true
                        })
                    ],
                    [
                        new SelectFormField({
                            key: 'type',
                            width: 50,
                            required: true,
                            options: [
                                new SelectOption({
                                    value: 'client',
                                    visibleFields: ['general.address']
                                }),
                                new SelectOption({
                                    value: 'restaurant',
                                    visibleFields: ['general.category']
                                })
                            ]
                        }),
                        new TextFormField({
                            key: 'address',
                            width: 50,
                            required: true
                        }),
                        new SelectFormField({
                            key: 'category',
                            width: 50,
                            required: true,
                            options: [
                                new SelectOption({
                                    value: 'traditional'
                                }),
                                new SelectOption({
                                    value: 'fast-food'
                                }),
                                new SelectOption({
                                    value: 'other'
                                })
                            ]
                        })
                    ]
                ]
            })
        ],
        submitAction: formValue => {
            console.log(formValue);
        }
    });

    ngOnInit(): void {
        this.config.setValues({
            general: {
                role: 'user'
            }
        });
    }
}
