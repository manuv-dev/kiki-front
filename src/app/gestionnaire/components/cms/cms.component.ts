import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionnaireDataService } from '../../services/gestionnaire-data.service';
import { KikiDataService } from '../../../services/kiki-data.service';
import { GestionnaireApiService } from '../../../services/gestionnaire-api.service';

@Component({
  selector: 'app-cms',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule],
  templateUrl: './cms.component.html'
})
export class CmsComponent implements OnInit {
  faqs: any[] = [];
  testimonials: any[] = [];
  cmsFilterTab: 'FAQS' | 'TESTIMONIALS' | 'ALL' = 'FAQS';
  faqPage = 1;
  faqPageSize = 5;

  showFaqModal = false;
  isEditingFaq = false;
  faqForm = { id: '', question: '', answer: '', category: 'Général' };

  showTestimonialModal = false;
  isEditingTestimonial = false;
  testimonialForm = { id: '', text: '', clientName: '', clientTitle: '', stars: 5 };

  constructor(
    public gData: GestionnaireDataService,
    private dataService: KikiDataService,
    private apiService: GestionnaireApiService
  ) {}

  ngOnInit(): void {
    this.gData.loadAll();
    this.gData.faqs$.subscribe(f => this.faqs = f);
    this.gData.testimonials$.subscribe(t => this.testimonials = t);
  }

  // --- FAQ ---
  getFaqsForPage(): any[] { const start = (this.faqPage - 1) * this.faqPageSize; return this.faqs.slice(start, start + this.faqPageSize); }
  getFaqTotalPages(): number { return Math.max(1, Math.ceil(this.faqs.length / this.faqPageSize)); }
  getFaqPageArray(): number[] { return Array.from({ length: this.getFaqTotalPages() }, (_, i) => i + 1); }

  openAddFaqModal(): void {
    this.isEditingFaq = false;
    this.faqForm = { id: '', question: '', answer: '', category: 'Général' };
    this.showFaqModal = true;
  }
  openEditFaqModal(f: any): void {
    this.isEditingFaq = true;
    this.faqForm = { id: f.id, question: f.question, answer: f.answer, category: f.category || 'Général' };
    this.showFaqModal = true;
  }
  closeFaqModal(): void { this.showFaqModal = false; }

  submitFaq(): void {
    if (!this.faqForm.question || !this.faqForm.answer) { this.dataService.showToast('Veuillez remplir la question et la réponse.', true); return; }
    const payload = { question: this.faqForm.question, reponse: this.faqForm.answer, categorie: this.faqForm.category };
    if (this.isEditingFaq) {
      this.apiService.updateFaq(this.faqForm.id, payload).subscribe({
        next: () => { this.dataService.showToast('FAQ mise à jour.'); this.gData.loadAll(); },
        error: () => { this.dataService.updateFaq(this.faqForm.id, { question: this.faqForm.question, answer: this.faqForm.answer, category: this.faqForm.category }); this.dataService.showToast('FAQ mise à jour.'); this.gData.loadAll(); }
      });
    } else {
      this.apiService.createFaq(payload).subscribe({
        next: () => { this.dataService.showToast('FAQ créée.'); this.gData.loadAll(); },
        error: () => { this.dataService.addFaq({ question: this.faqForm.question, answer: this.faqForm.answer, category: this.faqForm.category }); this.dataService.showToast('FAQ créée.'); this.gData.loadAll(); }
      });
    }
    this.showFaqModal = false;
  }

  deleteFaq(id: string): void {
    if (!confirm('Supprimer cette FAQ ?')) return;
    this.apiService.deleteFaq(id).subscribe({
      next: () => { this.dataService.showToast('FAQ supprimée.'); this.gData.loadAll(); },
      error: () => { this.dataService.deleteFaq(id); this.dataService.showToast('FAQ supprimée.'); this.gData.loadAll(); }
    });
  }

  // --- TESTIMONIALS ---
  getStarsArray(n: number): number[] { return Array.from({ length: n || 5 }, (_, i) => i); }

  openAddTestimonialModal(): void {
    this.isEditingTestimonial = false;
    this.testimonialForm = { id: '', text: '', clientName: '', clientTitle: '', stars: 5 };
    this.showTestimonialModal = true;
  }
  openEditTestimonialModal(t: any): void {
    this.isEditingTestimonial = true;
    this.testimonialForm = { id: t.id, text: t.text, clientName: t.clientName, clientTitle: t.clientTitle, stars: t.stars || 5 };
    this.showTestimonialModal = true;
  }
  closeTestimonialModal(): void { this.showTestimonialModal = false; }

  submitTestimonial(): void {
    if (!this.testimonialForm.text || !this.testimonialForm.clientName) { this.dataService.showToast('Veuillez remplir le témoignage et le nom du client.', true); return; }
    const payload = { temoignage: this.testimonialForm.text, nomClient: this.testimonialForm.clientName, titreFonction: this.testimonialForm.clientTitle, note: this.testimonialForm.stars };
    if (this.isEditingTestimonial) {
      this.apiService.updateTemoignage(this.testimonialForm.id, payload).subscribe({
        next: () => { this.dataService.showToast('Témoignage mis à jour.'); this.gData.loadAll(); },
        error: () => { this.dataService.updateTestimonial(this.testimonialForm.id, this.testimonialForm); this.dataService.showToast('Mis à jour.'); this.gData.loadAll(); }
      });
    } else {
      this.apiService.createTemoignage(payload).subscribe({
        next: () => { this.dataService.showToast('Témoignage ajouté.'); this.gData.loadAll(); },
        error: () => { this.dataService.addTestimonial(this.testimonialForm); this.dataService.showToast('Ajouté.'); this.gData.loadAll(); }
      });
    }
    this.showTestimonialModal = false;
  }

  deleteTestimonial(id: string): void {
    if (!confirm('Supprimer ce témoignage ?')) return;
    this.apiService.deleteTemoignage(id).subscribe({
      next: () => { this.dataService.showToast('Témoignage supprimé.'); this.gData.loadAll(); },
      error: () => { this.dataService.deleteTestimonial(id); this.dataService.showToast('Supprimé.'); this.gData.loadAll(); }
    });
  }
}
