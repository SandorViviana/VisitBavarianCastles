import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Status } from 'src/app/enums/status';
import { Castle } from 'src/app/interfaces/castle';
import { VisitRecord } from 'src/app/interfaces/visitRecord';
import { VisitRecordsService } from 'src/app/services/visit-records.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
visitRecords!:VisitRecord[]
filteredRecords?:VisitRecord[]
username!:string
castleSearched:string=''
selectedCastle?:Castle
mode:string=''
recordToEdit:VisitRecord={id:-1, castle:
  {
    castleId:-1,
    name: "",
    city: "",
    description:"",
    imageUrl:"",
    latitude:0,
    longitude:0
  }, addDate:new Date(),
  status:0
}
showDetails:boolean = false;
showEditModal:boolean=false;
listOfColumn = [
  {
    title: 'Castle',
    compare: (a: VisitRecord, b: VisitRecord) => a.castle.name.localeCompare(b.castle.name),
    priority: false
  },
  {
    title: 'City',
    compare: (a: VisitRecord, b: VisitRecord) => a.castle.city.localeCompare(b.castle.city),
    priority: 1
  },
  {
  title: 'Date of visit',
  compare: (a: VisitRecord, b: VisitRecord) => {
    const dateA = a.visitDate ? a.visitDate.toString() : "0"; // Assign 0 if visitDate is undefined or null
    const dateB = b.visitDate ? b.visitDate.toString() : "0"; // Assign 0 if visitDate is undefined or null
    return dateA.localeCompare(dateB);
  },
  priority: false,
},
{
  title: 'Date added',
  compare: (a: VisitRecord, b: VisitRecord) =>
    a.addDate.toString().localeCompare(b.addDate.toString()),
  priority: 1,
},
  {
    title:'Status',
    compare: (a: VisitRecord, b: VisitRecord) => a.status-b.status,
    priority:false
  }
];

setSearch(search: string) {
  if(this.visitRecords)
  this.filteredRecords = this.visitRecords.filter(record => record.castle.name.startsWith(search) && search!='');
}

constructor(private visitRecordsService:VisitRecordsService,private router: Router, private route: ActivatedRoute){  }
ngOnInit(){
  this.route.params.subscribe(params => {
    this.username = params['username'];
  });
  
  this.visitRecordsService
      .getRecordsOfUser(this.username)
      .subscribe(
        (visitRecords) =>
          this.visitRecords = visitRecords
          ); 
           
}

getStatusString(status: Status): string {
  return Status[status];
}

showModal(castle:Castle)
{
  this.showDetails=true;
  this.selectedCastle=castle;
  console.log(castle.description);  
}
addRecord(){
  this.showEditModal=true;
  this.mode='add';
}
editRecord(record:VisitRecord){
  this.showEditModal=true;
  this.recordToEdit=record;
  this.mode='edit'
}

addReceivedRecord(event:any) {if(event as VisitRecord!=null)
this.visitRecordsService.addRecordOfUser(this.username, event as VisitRecord).subscribe( ()=> {
  this.visitRecordsService
  .getRecordsOfUser(this.username)
  .subscribe(
    (visitRecords) =>
      this.visitRecords = visitRecords
      ); 
});}
editReceivedRecord(event:any) {
  if(event as VisitRecord!=null)
  this.visitRecordsService.editRecord((event as VisitRecord).id, event as VisitRecord).subscribe( ()=> {
    this.visitRecordsService
    .getRecordsOfUser(this.username)
    .subscribe(
      (visitRecords) =>
        this.visitRecords = visitRecords
        ); 
  });
}

deleteRecord(record:VisitRecord){
  console.log(this.visitRecords[0].id) 
  console.log(record.id);
  console.log(record.castle.name);
  this.visitRecordsService.deleteRecord(record.id).subscribe( ()=> {
    this.visitRecordsService
    .getRecordsOfUser(this.username)
    .subscribe(
      (visitRecords) =>
        this.visitRecords = visitRecords
        ); 
  })
}
}
