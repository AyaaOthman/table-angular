import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface UserRow {
  selected: boolean;
  name: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  tableData: UserRow[] = [];
  selectedUsers: UserRow[] = [];
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 10; // Random User API does not provide total, so we set a default
  totalItems: number = 100; // For demo, assume 100 users

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchApiData(this.currentPage);
  }

  // Fetch data from Random User API with server-side pagination
  fetchApiData(page: number): void {
    console.log('[fetchApiData] Fetching page:', page);
    const apiUrl = `https://randomuser.me/api/?page=${page}&results=${this.itemsPerPage}&seed=demo`;
    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        console.log('[fetchApiData] Response:', response);
        this.tableData = response.results.map((user: any) => {
          const email = user.email;
          // Check if this user is already selected
          const isSelected = this.selectedUsers.some(u => u.email === email);
          return {
            selected: isSelected,
            name: user.name.first + ' ' + user.name.last,
            email: email,
            avatar: user.picture.thumbnail
          };
        });
        this.currentPage = page;
        // totalPages and totalItems are static for demo
        console.log('[fetchApiData] Updated state:', {
          currentPage: this.currentPage,
          itemsPerPage: this.itemsPerPage,
          totalPages: this.totalPages,
          totalItems: this.totalItems,
          tableData: this.tableData,
          selectedUsers: this.selectedUsers
        });
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  // Navigation methods
  goToPage(page: number): void {
    console.log('[goToPage] Go to page:', page);
    if (page >= 1 && page <= this.totalPages) {
      this.fetchApiData(page);
    }
  }

  goToPreviousPage(): void {
    console.log('[goToPreviousPage] Current page:', this.currentPage);
    if (this.currentPage > 1) {
      this.fetchApiData(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    console.log('[goToNextPage] Current page:', this.currentPage);
    if (this.currentPage < this.totalPages) {
      this.fetchApiData(this.currentPage + 1);
    }
  }

  // Checkbox methods
  toggleAllRows(): void {
    const allSelected = this.tableData.every(row => row.selected);
    this.tableData.forEach(row => {
      row.selected = !allSelected;
      this.updateSelectedUsers(row);
    });
  }

  toggleRow(row: UserRow): void {
    row.selected = !row.selected;
    this.updateSelectedUsers(row);
  }

  updateSelectedUsers(row: UserRow): void {
    const exists = this.selectedUsers.some(u => u.email === row.email);
    if (row.selected && !exists) {
      this.selectedUsers.push({ ...row });
    } else if (!row.selected && exists) {
      this.selectedUsers = this.selectedUsers.filter(u => u.email !== row.email);
    }
  }

  // Check if all rows on current page are selected
  areAllRowsSelected(): boolean {
    return this.tableData.length > 0 && this.tableData.every(row => row.selected);
  }

  // Check if some rows on current page are selected
  areSomeRowsSelected(): boolean {
    const selectedCount = this.tableData.filter(row => row.selected).length;
    return selectedCount > 0 && selectedCount < this.tableData.length;
  }

  // Get selected rows count
  getSelectedCount(): number {
    return this.selectedUsers.length;
  }
}