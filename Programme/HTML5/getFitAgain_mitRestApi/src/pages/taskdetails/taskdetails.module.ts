import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskdetailsPage } from './taskdetails';

@NgModule({
  declarations: [
    TaskdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskdetailsPage),
  ],
})
export class TaskdetailsPageModule {}
