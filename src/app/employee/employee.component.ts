import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'sample-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  sub!: Subscription;
  errorMessage = '';
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.sub = this.dataService.getAllEmployees().subscribe({
      next: (employees: Employee[]) => {},
      error: (err) => (this.errorMessage = err),
    });

    this.sub = this.dataService.getDepartments().subscribe({
      next: (departments: any) => {},
      error: (err) => (this.errorMessage = err),
    });
  }
}
