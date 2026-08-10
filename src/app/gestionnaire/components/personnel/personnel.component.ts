import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionnaireDataService } from '../../services/gestionnaire-data.service';

@Component({
  selector: 'app-personnel',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: './personnel.component.html'
})
export class PersonnelComponent implements OnInit {
  staffList: any[] = [];
  staffPage = 1;
  staffPageSize = 5;

  constructor(public gData: GestionnaireDataService) {}

  ngOnInit(): void {
    this.gData.loadAll();
    this.gData.staff$.subscribe(s => this.staffList = s);
  }

  getStaffForPage(): any[] { const start = (this.staffPage - 1) * this.staffPageSize; return this.staffList.slice(start, start + this.staffPageSize); }
  getStaffTotalPages(): number { return Math.max(1, Math.ceil(this.staffList.length / this.staffPageSize)); }
  getStaffPageArray(): number[] { return Array.from({ length: this.getStaffTotalPages() }, (_, i) => i + 1); }
}
