import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { Employee } from '../employee';
import { DataService } from '../services/data.service';
import { Subscription, combineLatest } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'sample-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  sub!: Subscription;
  errorMessage = '';
  departments: any[];
  employees: Employee[] = [];

  //Pagination vaiables
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number = 1;
  pageSize: number = 6;
  pageSizeOptions: any = [6, 8, 12];
  length: number;
  filteredEmployees: Employee[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    //Subscribing to two observables
    this.sub = combineLatest([
      this.dataService.getAllEmployees(),
      this.dataService.getAllDepartments(),
    ]).subscribe({
      next: (res) => {
        this.employees = res[0];
        this.departments = res[1];
        this.length = this.employees.length;
        this.filteredEmployees = this.employees.slice(0, 6);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  // Transforming string to lowercase and filtering
  performFilter(filterBy: string): void {
    filterBy = filterBy.toLocaleLowerCase();
    this.filteredEmployees = this.employees.filter((employee: Employee) =>
      employee.department.toLocaleLowerCase().includes(filterBy)
    );
    // After filtering, setting pagination values
    this.length = this.filteredEmployees.length;
    this.pageIndex = 1;
    this.pageSize = this.filteredEmployees.length;
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.employees.length) {
      endIndex = this.employees.length;
    }
    this.filteredEmployees = this.employees.slice(startIndex, endIndex);
  }

  ngOnDestroy(): void {
    // Unsubscribing to prevent memory leaks
    this.sub.unsubscribe();
  }
}
