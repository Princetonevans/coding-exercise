import { Component, OnInit, Signal, computed, signal } from '@angular/core';
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
  departments: any[];
  // Use the new Angular signals feature to perform the filter
  listFilter = signal('');
  filteredEmployees = computed(() => this.performFilter(this.listFilter()));
  employees: Employee[] = [];

  constructor(private dataService: DataService) {}

  performFilter(filterBy: string): Employee[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.employees.filter((employee: Employee) =>
      employee.department.toLocaleLowerCase().includes(filterBy)
    );
  }

  ngOnInit(): void {
    // calling service to get employees
    this.sub = this.dataService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        //Initializing the data
        this.filteredEmployees = computed(() =>
          this.performFilter(this.listFilter())
        );
      },
      error: (err) => (this.errorMessage = err),
    });

    // calling service to get departments
    this.sub = this.dataService.getDepartments().subscribe({
      next: (departments: any) => {
        this.departments = departments!;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  onFilterChange(value: string) {
    this.listFilter.set(value);
  }

  ngOnDestroy(): void {
    // Unsubscribing to prevent memory leaks
    this.sub.unsubscribe();
  }
}
