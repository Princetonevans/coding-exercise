import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
@NgModule({
  declarations: [],
  imports: [CommonModule, MatChipsModule, MatSelectModule, MatCardModule],
  exports: [MatChipsModule, MatSelectModule, MatCardModule],
})
export class MaterialModule {}
