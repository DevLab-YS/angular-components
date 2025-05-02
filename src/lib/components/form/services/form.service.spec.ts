import { FormService } from './form.service';
import { FormConfig, FormSection } from '../models/form-config.model';
import { SelectFormField, SelectOption, TextFormField } from '../models/form-field.model';
import { Button, ButtonType } from '../../button/models/button.model';

describe('FormService', () => {
    let service: FormService;

    beforeEach(() => {
        service = new FormService();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('isValid', () => {
        it('should return true if all shown required fields have values', () => {
            const field1 = new TextFormField({ key: 'field1', required: true }),
                field2 = new TextFormField({ key: 'field2', hidden: true, required: true }),
                config = new FormConfig({
                    prefix: 'test',
                    header: 'test form',
                    sections: [
                        new FormSection({
                            key: 'section1',
                            fields: [[field1, field2]]
                        })
                    ],
                    cancelAction: () => {},
                    submitAction: () => {}
                });
            config.setValues({ section1: { field1: 'value1' } });

            expect(service.isValid(config)).toBeTrue();
        });

        it('should return false if a shown required field is empty', () => {
            const field1 = new TextFormField({ key: 'field1', required: true }),
                field2 = new TextFormField({ key: 'field2', hidden: true, required: true }),
                config = new FormConfig({
                    prefix: 'test',
                    header: 'test form',
                    sections: [
                        new FormSection({
                            key: 'section1',
                            fields: [[field1, field2]]
                        })
                    ],
                    cancelAction: () => {},
                    submitAction: () => {}
                });
            config.setValues({ section1: { field2: 'value1' } });

            expect(service.isValid(config)).toBeFalse();
        });

        it('should return false if config is undefined', () => {
            expect(service.isValid()).toBeFalse();
        });
    });

    describe('hasChanges', () => {
        it('should return true if config.hasChanges returns true', () => {
            const field1 = new TextFormField({ key: 'field1' }),
                field2 = new TextFormField({ key: 'field2', hidden: true }),
                config = new FormConfig({
                    prefix: 'test',
                    header: 'test form',
                    sections: [
                        new FormSection({
                            key: 'section1',
                            fields: [[field1, field2]]
                        })
                    ],
                    cancelAction: () => {},
                    submitAction: () => {}
                });
            field1.value.current = 'value1';
            field2.value.current = 'value2';

            expect(service.hasChanges(config)).toBeTrue();
        });

        it('should return false if config is undefined', () => {
            expect(service.hasChanges()).toBeFalse();
        });
    });

    describe('getFormValue', () => {
        it('should return the current values of visible fields', () => {
            const field1 = new TextFormField({ key: 'field1' }),
                field2 = new TextFormField({ key: 'field2', hidden: true }),
                config = new FormConfig({
                    prefix: 'test',
                    header: 'test form',
                    sections: [
                        new FormSection({
                            key: 'section1',
                            fields: [[field1, field2]]
                        })
                    ],
                    cancelAction: () => {},
                    submitAction: () => {}
                });
            config.setValues({ section1: { field1: 'value1', field2: 'value2' } });

            const result = service.getFormValue(config);

            expect(result).toEqual({
                section1: { field1: 'value1' }
            });
        });

        it('should return empty object if config is undefined', () => {
            expect(service.getFormValue()).toEqual({});
        });
    });

    describe('resetValues', () => {
        it('should call resetValues on each section', () => {
            const field1 = new TextFormField({ key: 'field1' }),
                field2 = new TextFormField({ key: 'field2', hidden: true }),
                config = new FormConfig({
                    prefix: 'test',
                    header: 'test form',
                    sections: [
                        new FormSection({
                            key: 'section1',
                            fields: [[field1, field2]]
                        })
                    ],
                    cancelAction: () => {},
                    submitAction: () => {}
                });
            spyOn(config.sections[0], 'resetValues');

            service.resetValues(config);
            expect(config.sections[0].resetValues).toHaveBeenCalled();
        });
    });

    describe('updateCancelButton', () => {
        it('should disable button if no changes', () => {
            const button = new Button({
                label: 'Cancel',
                type: ButtonType.Secondary,
                action: () => {}
            });
            const config = {} as FormConfig;
            spyOn(service, 'hasChanges').and.returnValue(false);

            service.updateCancelButton(button, config);

            expect(button.disabled).toBeTrue();
            expect(button.tooltip).toBe(service.noChangesMessage);
        });

        it('should enable button if there are changes', () => {
            const button = new Button({
                label: 'Cancel',
                type: ButtonType.Secondary,
                action: () => {}
            });
            const config = {} as FormConfig;
            spyOn(service, 'hasChanges').and.returnValue(true);

            service.updateCancelButton(button, config);

            expect(button.disabled).toBeFalse();
            expect(button.tooltip).toBe('');
        });
    });

    describe('updateSaveButton', () => {
        it('should disable if invalid or no changes', () => {
            const button = new Button({
                    label: 'save',
                    type: ButtonType.Primary,
                    action: () => {}
                }),
                expectedTooltip = 'test tooltip';
            const config = {} as FormConfig;
            spyOn(service, 'getAcceptTooltip').and.returnValue(expectedTooltip);
            spyOn(service, 'isValid').and.returnValue(false);
            spyOn(service, 'hasChanges').and.returnValue(false);

            service.updateSaveButton(button, config);

            expect(button.disabled).toBeTrue();
            expect(button.tooltip).toBe(expectedTooltip);
        });

        it('should enable if valid and has changes', () => {
            const button = new Button({
                    label: 'save',
                    type: ButtonType.Primary,
                    action: () => {}
                }),
                expectedTooltip = '';
            const config = {} as FormConfig;
            spyOn(service, 'getAcceptTooltip').and.returnValue(expectedTooltip);
            spyOn(service, 'isValid').and.returnValue(true);
            spyOn(service, 'hasChanges').and.returnValue(true);

            service.updateCancelButton(button, config);

            expect(button.disabled).toBeFalse();
            expect(button.tooltip).toBe(expectedTooltip);
        });
    });

    describe('getAcceptTooltip', () => {
        it('should show noChanges message if no changes', () => {
            const config = {} as FormConfig;
            spyOn(service, 'hasChanges').and.returnValue(false);
            spyOn(service, 'isValid').and.returnValue(true);

            const tooltip = service.getAcceptTooltip(config);

            expect(tooltip).toBe(service.noChangesMessage);
        });

        it('should show invalidFields message if form is invalid', () => {
            const config = {} as FormConfig;
            spyOn(service, 'hasChanges').and.returnValue(false);
            spyOn(service, 'isValid').and.returnValue(false);

            const tooltip = service.getAcceptTooltip(config);

            expect(tooltip).toBe(service.invalidFieldsMessage);
        });

        it('should return empty string if valid and changed', () => {
            const config = {} as FormConfig;
            spyOn(service, 'hasChanges').and.returnValue(true);
            spyOn(service, 'isValid').and.returnValue(true);

            const tooltip = service.getAcceptTooltip(config);

            expect(tooltip).toEqual('');
        });
    });

    describe('updateFieldsVisibility', () => {
        it('should hide all subfields by default and show only for current select option', () => {
            const field1 = new TextFormField({ key: 'field1' }),
                field2 = new TextFormField({ key: 'field2' }),
                selectField = new SelectFormField({
                    key: 'select',
                    options: [
                        new SelectOption({ value: 'opt1', visibleFields: ['section1.field1'] }),
                        new SelectOption({ value: 'opt2', visibleFields: ['section1.field2'] })
                    ]
                }),
                config = new FormConfig({
                    prefix: 'test',
                    header: 'test form',
                    sections: [
                        new FormSection({
                            key: 'section1',
                            fields: [[selectField], [field1, field2]]
                        })
                    ],
                    cancelAction: () => {},
                    submitAction: () => {}
                });
            config.setValues({ section1: { select: 'opt2' } });

            service.updateFieldsVisibility(config);

            expect(field1.hidden).toBeTrue();
            expect(field2.hidden).toBeFalse();
        });
    });
});
