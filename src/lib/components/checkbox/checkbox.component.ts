import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck as faCircleCheck_reg } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'ys-checkbox',
    standalone: true,
    imports: [FontAwesomeModule, CommonModule, FormsModule],
    templateUrl: './checkbox.component.html'
})
export class CheckboxComponent {
    @Input() checked: boolean = false;
    @Output() checkedChange = new EventEmitter<boolean>();

    checkedIcon = faCircleCheck;
    uncheckedIcon = faCircleCheck_reg;

    onChange() {
        this.checked = !this.checked;
        this.checkedChange.emit(this.checked);
    }
}
