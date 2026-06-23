import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { Toast, ToastModule, ToastPositionType } from 'primeng/toast';
import { DsButtonComponent } from '../ds-button/ds-button.component';
import { VariantEnum } from '@ds/design-system/core';

@Component({
  selector: 'ds-toast',
  imports: [ToastModule, DsButtonComponent],
  templateUrl: './ds-toast.component.html',
  styleUrl: './ds-toast.component.scss',
})
export class DsToastComponent {
  @ViewChild('toast') toast!: Toast;
  @Input() key = '';
  @Input() detailsButton = false;
  @Input() styleClass = 'ds-toast';
  @Input() config = {
    position: 'top-left' as ToastPositionType,
  };
  @Output() clickDetailsEvent = new EventEmitter<any>();
  @Output() closeToastEvent = new EventEmitter<any>();

  VariantEnum = VariantEnum;

  onCloseToast(message: any) {
    this.closeToastEvent.emit(message);
  }

  onClickDetails(message: any) {
    this.clickDetailsEvent.emit(message);
  }
}
