import { Component, Input } from '@angular/core';
import { HeaderConfig } from './models/header-config.model';
import { CommonModule } from '@angular/common';
import { HeaderActionComponent } from './components/header-action/header-action.component';

@Component({
    selector: 'ys-header',
    standalone: true,
    imports: [CommonModule, HeaderActionComponent],
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Input()
    config?: HeaderConfig;
}
