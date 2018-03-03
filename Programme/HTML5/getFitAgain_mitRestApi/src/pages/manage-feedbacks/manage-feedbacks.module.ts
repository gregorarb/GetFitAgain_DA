import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageFeedbacksPage } from './manage-feedbacks';

@NgModule({
  declarations: [
    ManageFeedbacksPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageFeedbacksPage),
  ],
})
export class ManageFeedbacksPageModule {}
