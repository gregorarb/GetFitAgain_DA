import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageQuestionsPage } from './manage-questions';

@NgModule({
  declarations: [
    ManageQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageQuestionsPage),
  ],
})
export class ManageQuestionsPageModule {}
