import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatChipsModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  exports: [MatChipsModule, MatSelectModule, MatCardModule, MatPaginatorModule],
})
export class MaterialModule {}
