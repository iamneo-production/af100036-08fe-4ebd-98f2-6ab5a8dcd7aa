import { Component, Input, OnInit } from '@angular/core';
import { Faq } from 'src/app/Faq.module';
import { AdminDashboardService } from 'src/app/admin-dashboard.service';

@Component({
  selector: 'app-faqform-component',
  templateUrl: './faqform-component.component.html',
  styleUrls: ['./faqform-component.component.css']
})
export class FaqformComponentComponent implements OnInit {
  showfaq: boolean = false;
  faqs: Faq[] = [];
  newFaq: Faq = { id: 0, question: '', answer: '' };
@Input()
  isAdminLoggedIn:boolean=false;

  showFaq(): void {
    this.showfaq = !this.showfaq;
  }

  constructor(private adminService: AdminDashboardService) {}

  ngOnInit() {
    this.getAllFAQs();
  }

  getAllFAQs() {
    this.adminService.getAllFAQs().subscribe(
      (data: Faq[]) => {
        this.faqs = data;
      },
      (error) => {
        console.log('An error occurred while retrieving FAQs:', error);
      }
    );
  }

  addFAQ() {
    this.adminService.addFAQ(this.newFaq).subscribe(
      () => {
        this.refreshFAQs();
        this.newFaq = { id: 0, question: '', answer: '' };
      },
      (error) => {
        console.log('An error occurred while adding a FAQ:', error);
      }
    );
  }

  refreshFAQs() {
    this.getAllFAQs();
  }

  updateFAQ(id: number, updatedFaq: Faq) {
    this.adminService.updateFAQ(id, updatedFaq).subscribe(
      (data: Faq) => {
        const index = this.faqs.findIndex(faq => faq.id === id);
        if (index !== -1) {
          this.faqs[index] = data;
        }
      },
      (error) => {
        console.log('An error occurred while updating the FAQ:', error);
      }
    );
  }

  deleteFAQ(id: number) {
    this.adminService.deleteFAQ(id).subscribe(
      () => {
        this.faqs = this.faqs.filter(faq => faq.id !== id);
      },
      (error) => {
        console.log('An error occurred while deleting the FAQ:', error);
      }
    );
  }
}