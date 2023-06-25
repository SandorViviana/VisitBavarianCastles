import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MapComponent } from './map/map.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CastleDetailsComponent } from './castle-details/castle-details.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AddEditRecordComponent } from './add-edit-record/add-edit-record.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
@NgModule({
  declarations: [
    MapComponent,
    DashboardPageComponent,
    HeaderComponent,
    TableComponent,
    CastleDetailsComponent,
    AddEditRecordComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule, 
    NzTableModule, 
    FormsModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzCalendarModule
  ]
})
export class DashboardModule { }
