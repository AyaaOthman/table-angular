import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TableRow {
  selected: boolean;
  name: string;
  city: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  tableData: TableRow[] = [
    { selected: false, name: 'John Doe', city: 'New York' },
    { selected: false, name: 'Jane Smith', city: 'Los Angeles' },
    { selected: false, name: 'Mike Johnson', city: 'Chicago' },
    { selected: false, name: 'Sarah Wilson', city: 'Houston' },
    { selected: false, name: 'David Brown', city: 'Phoenix' },
    { selected: false, name: 'Emily Davis', city: 'Philadelphia' },
    { selected: false, name: 'Robert Miller', city: 'San Antonio' },
    { selected: false, name: 'Lisa Garcia', city: 'San Diego' },
    { selected: false, name: 'James Rodriguez', city: 'Dallas' },
    { selected: false, name: 'Jennifer Martinez', city: 'San Jose' },
    { selected: false, name: 'Christopher Anderson', city: 'Austin' },
    { selected: false, name: 'Amanda Taylor', city: 'Jacksonville' },
    { selected: false, name: 'Daniel Thomas', city: 'Fort Worth' },
    { selected: false, name: 'Michelle Hernandez', city: 'Columbus' },
    { selected: false, name: 'Matthew Lopez', city: 'Charlotte' },
    { selected: false, name: 'Nicole Gonzalez', city: 'San Francisco' },
    { selected: false, name: 'Anthony Perez', city: 'Indianapolis' },
    { selected: false, name: 'Stephanie Torres', city: 'Seattle' },
    { selected: false, name: 'Kevin Ramirez', city: 'Denver' },
    { selected: false, name: 'Rachel Campbell', city: 'Washington' },
    { selected: false, name: 'Brian Mitchell', city: 'Boston' },
    { selected: false, name: 'Amber Roberts', city: 'El Paso' },
    { selected: false, name: 'Steven Carter', city: 'Nashville' },
    { selected: false, name: 'Melissa Phillips', city: 'Detroit' },
    { selected: false, name: 'Timothy Evans', city: 'Oklahoma City' },
    { selected: false, name: 'Heather Edwards', city: 'Portland' }
  ];

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor() {
    this.calculateTotalPages();
  }

  // Calculate total pages
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.tableData.length / this.itemsPerPage);
  }

  // Get current page data
  getCurrentPageData(): TableRow[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.tableData.slice(startIndex, endIndex);
  }

  // Navigation methods
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Checkbox methods
  toggleAllRows(): void {
    const currentPageData = this.getCurrentPageData();
    const allSelected = currentPageData.every(row => row.selected);
    
    currentPageData.forEach(row => {
      row.selected = !allSelected;
    });
  }

  toggleRow(row: TableRow): void {
    row.selected = !row.selected;
  }

  // Check if all rows on current page are selected
  areAllRowsSelected(): boolean {
    const currentPageData = this.getCurrentPageData();
    return currentPageData.length > 0 && currentPageData.every(row => row.selected);
  }

  // Check if some rows on current page are selected
  areSomeRowsSelected(): boolean {
    const currentPageData = this.getCurrentPageData();
    const selectedCount = currentPageData.filter(row => row.selected).length;
    return selectedCount > 0 && selectedCount < currentPageData.length;
  }

  // Get selected rows count
  getSelectedCount(): number {
    return this.tableData.filter(row => row.selected).length;
  }
}