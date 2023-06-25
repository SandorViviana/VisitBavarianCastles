import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from 'src/app/enums/status';
import { CustomValidators } from 'src/app/helpers/custom-validators';
import { Castle } from 'src/app/interfaces/castle';
import { VisitRecord } from 'src/app/interfaces/visitRecord';
import { CastleService } from 'src/app/services/castle.service';


@Component({
  selector: 'app-add-edit-record',
  templateUrl: './add-edit-record.component.html',
  styleUrls: ['./add-edit-record.component.scss']
})
export class AddEditRecordComponent implements OnInit, OnChanges {
  @Input() mode!:string
  @Input() isVisible!:boolean;
  @Input() record!:VisitRecord;
  recordForm!: FormGroup; 
  castles!:Castle[]


  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addRecord: EventEmitter<VisitRecord> = new EventEmitter<VisitRecord>();
  @Output() editRecord: EventEmitter<VisitRecord> = new EventEmitter<VisitRecord>();

  constructor(private castleService:CastleService) {
    this.castleService.getCastles().subscribe((castles) => {
      this.castles = castles;
      
    });
  }


  ngOnChanges(): void {
    this.recordForm = new FormGroup({
      castle: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      visitDate: new FormControl(null, [Validators.minLength(1), CustomValidators.visitDate])
    });
    if (this.mode == 'edit') {
      console.log(this.record.castle.name);
      console.log(this.record.status);
      this.recordForm.setValue({
        castle: this.record.castle as Castle,
        status: this.record.status,
        visitDate: this.record.visitDate
      });
  }
}
  ngOnInit(): void {
    

    this.recordForm = new FormGroup({
      castle: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      visitDate: new FormControl(null, [Validators.required, CustomValidators.visitDate])
    });
 
  }

  get visitDateFormControl(): FormControl {
    return this.recordForm.get('visitDate') as FormControl;
  }

  get statusFormControl(): FormControl {
    return this.recordForm.get('status') as FormControl;
  }
  handleOk() {
    if (this.recordForm.valid) {
      if(this.mode=="add") {
        this.addVisitRecord();
      }
      if (this.mode=="edit") {
       this.editVisitRecord();
      }
      this.closeModal.emit(true);
      this.isVisible=false;
      this.recordForm.reset();
    }
  }
  handleCancel() {      
    this.closeModal.emit(true);
    this.isVisible=false;
    this.recordForm.reset();

  }

  addVisitRecord() {  
    this.record.castle=this.recordForm.get('castle')?.value;
    this.record.status=this.recordForm.get('status')?.value;
    this.record.visitDate=this.recordForm.get('visitDate')?.value;  
    this.addRecord.emit(this.record); 
  }

  editVisitRecord() {
    this.record.castle=this.recordForm.get('castle')?.value;
    this.record.status=this.recordForm.get('status')?.value as Status;
    this.record.visitDate=this.recordForm.get('visitDate')?.value;
    this.editRecord.emit(this.record)
  }
}
