import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-component',
  templateUrl: './sidebar-component.component.html',
  styleUrls: ['./sidebar-component.component.css']
})
export class SidebarComponentComponent {

  public showAddJobForm: boolean = false;

    
    @Output() sectionToggled: EventEmitter<string> = new EventEmitter<string>();
    @Output() addJob: EventEmitter<void> = new EventEmitter<void>();
    @Output() addEmployerform: EventEmitter<void> = new EventEmitter<void>();
    @Output() showfaq: EventEmitter<void> = new EventEmitter<void>();
    @Output() showEmployerAnalytics: EventEmitter<void> = new EventEmitter<void>();
    @Output()addJobSeeker: EventEmitter<void> = new EventEmitter<void>();
    
    @Output() showReportedJobSeekersEvent = new EventEmitter<void>();
    @Input() showSection: string | null = null;
    isSidebarOpen: boolean = false;
  
    @Output() addContentFormClicked: EventEmitter<void> = new EventEmitter<void>();
    openContentManagementForm() {
      this.addContentFormClicked.emit();
    }
    
  emitAddJobEvent(): void {
    this.addJob.emit();
  }
  emitshowEmployerAnalytics():void{
    this.showEmployerAnalytics.emit();
  }
  emitAddEmployerEvent():void{
    this.addEmployerform.emit();
  }
  emitshowfaq(): void {
    this.showfaq.emit();
  }
   
  toggleFaq():void{
    this.showfaq.emit();
  }
    toggleSection(sectionId: string): void {
      this.sectionToggled.emit(sectionId);
    }
    

    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  
  
    isSectionActive(sectionId: string): boolean {
      return this.showSection === sectionId;
    }
   
    @Output() showReportedJobsEvent = new EventEmitter<void>();

    @Input() queryParams: any;
  
    showReportedJobs() {
      this.showReportedJobsEvent.emit();
    }
   
   
    
    @Output() showReportedEmployersEvent= new EventEmitter<void>();

    
  
    showReportedEmployers() {
      this.showReportedEmployersEvent .emit();
    }
    showReportedJobSeekers() {
      this.showReportedJobSeekersEvent.emit();
    }
    emitAddJobSeekersEvent(): void {
      this.addJobSeeker.emit();
    }
    
  }
  