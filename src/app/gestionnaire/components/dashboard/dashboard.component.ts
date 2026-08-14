import { Component, ViewEncapsulation, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KikiDataService } from '../../../services/kiki-data.service';
import { GestionnaireApiService, DashboardStatsDto } from '../../../services/gestionnaire-api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  currentYear = new Date().getFullYear();
  currentMonthIndex = new Date().getMonth();
  currentMonth = '';
  selectedChartFilter = 'Toutes';
  chartTabs = ['Toutes', 'La Diva', 'Traiteur', 'Événements', 'Food Truck', 'À Emporter'];
  requests: any[] = [];
  clients: any[] = [];
  
  dashboardStats: DashboardStatsDto | null = null;
  isLoadingStats = false;

  constructor(private dataService: KikiDataService, private apiService: GestionnaireApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateCurrentMonthLabel();
    this.loadData();
  }

  loadData(): void {
    this.apiService.getAllDemandes().subscribe(reqs => {
      this.requests = reqs;
      this.cdr.detectChanges();
    });
    this.clients = [];
    
    this.isLoadingStats = true;
    this.apiService.getDashboardStats(this.currentYear, this.currentMonthIndex + 1).subscribe({
      next: (stats) => {
        this.dashboardStats = stats;
        setTimeout(() => {
          this.isLoadingStats = false;
          this.cdr.detectChanges();
        }, 2000);
      },
      error: (err) => {
        console.error('Erreur chargement stats', err);
        setTimeout(() => {
          this.isLoadingStats = false;
          this.cdr.detectChanges();
        }, 2000);
      }
    });
  }

  updateCurrentMonthLabel(): void {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    this.currentMonth = `${months[this.currentMonthIndex]} ${this.currentYear}`;
  }

  getRequestsForCurrentMonth(): any[] {
    const yStr = String(this.currentYear);
    const mStr = (this.currentMonthIndex + 1) < 10 ? `0${this.currentMonthIndex + 1}` : `${this.currentMonthIndex + 1}`;
    const prefix = `${yStr}-${mStr}`;
    return this.requests.filter(r => r.dateSubmitted && String(r.dateSubmitted).startsWith(prefix));
  }

  // Local counts removed in favor of API dashboardStats

  // --- CHART LOGIC ---
  getChartMonthList(): { label: string; datePrefix: string }[] {
    const res = [];
    const monthsNames = ['JAN.', 'FÉV.', 'MAR.', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEP.', 'OCT.', 'NOV.', 'DÉC.'];
    for (let i = 5; i >= 0; i--) {
      let m = this.currentMonthIndex - i;
      let y = this.currentYear;
      if (m < 0) {
        m += 12;
        y -= 1;
      }
      const mStr = (m + 1) < 10 ? `0${m + 1}` : `${m + 1}`;
      res.push({ label: monthsNames[m], datePrefix: `${y}-${mStr}` });
    }
    return res;
  }

  getChartData(): number[] {
    const monthList = this.getChartMonthList();
    const data = [];
    for (const m of monthList) {
      const monthReqs = this.requests.filter(r => r.dateSubmitted && String(r.dateSubmitted).startsWith(m.datePrefix));
      let count = 0;
      if (this.selectedChartFilter === 'Toutes') {
        count = monthReqs.length;
      } else {
        const filterMap: { [key: string]: string } = {
          'La Diva': 'salle-diva',
          'Traiteur': 'traiteur',
          'Événements': 'evenements',
          'Food Truck': 'foodtruck',
          'À Emporter': 'takeaway'
        };
        const mappedType = filterMap[this.selectedChartFilter];
        count = monthReqs.filter(r => r.prestationId === mappedType).length;
      }
      data.push(count);
    }
    return data;
  }

  getChartMaxVal(): number {
    const max = Math.max(...this.getChartData());
    return max < 5 ? 5 : (Math.ceil(max / 5) * 5);
  }

  valToY(val: number): number {
    const max = this.getChartMaxVal();
    const height = 150; // de 20 (haut) à 170 (bas)
    const ratio = val / max;
    return 170 - (ratio * height);
  }

  getChartYLabel3(): number { return this.getChartMaxVal(); }
  getChartYLabel2(): number { return Math.round(this.getChartMaxVal() * 2 / 3); }
  getChartYLabel1(): number { return Math.round(this.getChartMaxVal() / 3); }

  getChartAreaPath(): string { return `${this.getChartPath()} L 510,170 L 60,170 Z`; }
  
  getChartPath(): string {
    const pts = this.getChartData();
    const coords = pts.map((p, i) => ({ x: 60 + i * 90, y: this.valToY(p) }));
    return `M ${coords[0].x},${coords[0].y} L ${coords[1].x},${coords[1].y} L ${coords[2].x},${coords[2].y} L ${coords[3].x},${coords[3].y} L ${coords[4].x},${coords[4].y} L ${coords[5].x},${coords[5].y}`;
  }

  getChartPoints(): any[] {
    const pts = this.getChartData();
    const monthList = this.getChartMonthList();
    const xs = [60, 150, 240, 330, 420, 510];
    return xs.map((x, idx) => ({
      x,
      y: this.valToY(pts[idx]),
      label: monthList[idx].label,
      isLast: idx === 5
    }));
  }

  // --- OTHERS ---
  getActiveConflictsCount(): number {
    const reqs = this.getRequestsForCurrentMonth();
    if (reqs.length === 0) return 0;
    const divaReqs = reqs.filter(r => r.prestationId === 'salle-diva');
    const seen = new Set<string>();
    const conflicting = new Set<string>();
    for (const r of divaReqs) {
       if (!r.date) continue;
       const key = r.date + '_' + (r.time || '');
       if (seen.has(key)) conflicting.add(key);
       else seen.add(key);
    }
    return conflicting.size;
  }

  getRoomBlockedCount(): number {
    const reqs = this.getRequestsForCurrentMonth();
    return reqs.filter(r => (r.prestationId === 'salle-diva' || r.prestationTitle === 'Salle La Diva') && (r.status === 'accepted' || r.status === 'approved')).length;
  }

  getClientName(clientId: string): string {
    const c = this.clients.find(item => item.id === clientId);
    return c ? `${c.firstName || ''} ${c.lastName || ''}`.trim() : 'Client Inconnu';
  }

  getPrestationName(pId: string): string {
    const types: any = {
      'salle-diva': 'Salle La Diva',
      'traiteur': 'Service Traiteur Prestige',
      'evenements': "Organisation d'Événements",
      'foodtruck': 'Food Truck Gourmet',
      'takeaway': 'Plats à Emporter'
    };
    return types[pId] || pId;
  }

  getRecentRequestsFeed(): any[] {
    if (this.dashboardStats && this.dashboardStats.recentRequests) {
        return this.dashboardStats.recentRequests.map((r: any) => ({
          name: r.clientName || 'Client Inconnu',
          badge: this.getPrestationName(r.prestationId) || r.prestationId,
          date: r.dateSubmitted ? String(r.dateSubmitted).split('T')[0] : "Aujourd'hui",
          dotColor: (r.status === 'accepted' || r.status === 'aboutis' || r.status === 'approved') ? '#059669' : (r.status === 'rejected' ? '#DC2626' : '#D97706')
        }));
    }
    return [];
  }

  prevMonth(): void {
    if (this.currentYear === 1997 && this.currentMonthIndex === 0) return;
    if (this.currentMonthIndex === 0) {
      this.currentMonthIndex = 11;
      this.currentYear--;
    } else {
      this.currentMonthIndex--;
    }
    this.updateCurrentMonthLabel();
    this.loadData();
  }

  nextMonth(): void {
    if (this.currentMonthIndex === 11) {
      this.currentMonthIndex = 0;
      this.currentYear++;
    } else {
      this.currentMonthIndex++;
    }
    this.updateCurrentMonthLabel();
    this.loadData();
  }

  getMonthInputValue(): string {
    const mStr = (this.currentMonthIndex + 1) < 10 ? `0${this.currentMonthIndex + 1}` : `${this.currentMonthIndex + 1}`;
    return `${this.currentYear}-${mStr}`;
  }

  onMonthInputChange(event: any): void {
    const val = event.target.value;
    if (val) {
      const parts = val.split('-');
      if (parts.length === 2) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        if (y >= 1997) {
          this.currentYear = y;
          this.currentMonthIndex = m;
          this.updateCurrentMonthLabel();
          this.loadData();
        }
      }
    }
  }
}
