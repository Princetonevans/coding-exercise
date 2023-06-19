import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { Employee } from '../employee';
import { DataService } from '../services/data.service';
import { Observable, Subscription } from 'rxjs';
import { combineLatest } from 'rxjs';
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

  ngOnInit(): void {
    //Subscribing to two observables
    this.sub = combineLatest([
      this.dataService.getAllEmployees(),
      this.dataService.getAllDepartments(),
    ]).subscribe({
      next: (res) => {
        this.employees = res[0];
        this.departments = res[1];
        this.filteredEmployees = computed(() =>
          this.performFilter(this.listFilter())
        );
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  // Transforming string to lowercase and filtering
  performFilter(filterBy: string): Employee[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.employees.filter((employee: Employee) =>
      employee.department.toLocaleLowerCase().includes(filterBy)
    );
  }

  onFilterChange(value: string) {
    // Updating array
    this.listFilter.set(value);
  }

  ngOnDestroy(): void {
    // Unsubscribing to prevent memory leaks
    this.sub.unsubscribe();
  }
}
