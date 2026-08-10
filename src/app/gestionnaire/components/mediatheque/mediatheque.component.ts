import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionnaireDataService } from '../../services/gestionnaire-data.service';
import { KikiDataService } from '../../../services/kiki-data.service';

@Component({
  selector: 'app-mediatheque',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule],
  templateUrl: './mediatheque.component.html'
})
export class MediathequeComponent implements OnInit {
  mediaList: any[] = [];
  events: any[] = [];
  selectedEventFilterForMedia = 'ALL';
  mediaPage = 1;
  mediaPageSize = 6;
  showMediaModal = false;
  mediaForm = { title: '', url: '', type: 'image', eventId: '' };

  constructor(public gData: GestionnaireDataService, private dataService: KikiDataService) {}

  ngOnInit(): void {
    this.gData.loadAll();
    this.gData.media$.subscribe(m => this.mediaList = m);
    this.gData.events$.subscribe(e => this.events = e);
  }

  getEventTitlesWithMedia(): string[] {
    const titles = new Set<string>();
    this.mediaList.forEach(m => { if (m.eventTitle) titles.add(m.eventTitle); });
    return Array.from(titles);
  }

  getMediaByEventTitle(title: string): any[] {
    return this.mediaList.filter(m => m.eventTitle === title);
  }

  getMediaTotalPages(): number { return Math.max(1, Math.ceil(this.mediaList.length / this.mediaPageSize)); }
  getMediaPageArray(): number[] { return Array.from({ length: this.getMediaTotalPages() }, (_, i) => i + 1); }

  openAddMediaModal(): void {
    this.mediaForm = { title: '', url: '', type: 'image', eventId: '' };
    this.showMediaModal = true;
  }
  closeMediaModal(): void { this.showMediaModal = false; }

  submitAddMedia(): void {
    if (!this.mediaForm.url || !this.mediaForm.title) { this.dataService.showToast('Veuillez remplir tous les champs.', true); return; }
    const ev = this.events.find(e => e.id === this.mediaForm.eventId);
    this.dataService.addMedia({ ...this.mediaForm, type: this.mediaForm.type as 'image' | 'video', eventTitle: ev ? ev.title : 'Événement Kiki Traiteur' });
    this.dataService.showToast('Média ajouté à la médiathèque !');
    this.showMediaModal = false;
    this.gData.loadAll();
  }

  deleteMedia(id: string): void {
    if (confirm('Supprimer ce média ?')) {
      this.dataService.deleteMedia(id);
      this.dataService.showToast('Média supprimé.');
      this.gData.loadAll();
    }
  }
}
