import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Castle } from 'src/app/interfaces/castle';

@Component({
  selector: 'app-castle-details',
  templateUrl: './castle-details.component.html',
  styleUrls: ['./castle-details.component.scss']
})
export class CastleDetailsComponent {

  @Input() castle!: Castle;
  @Input() isVisible!:boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleOk() {   this.closeModal.emit(true);
    this.isVisible=false;}
}
