import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-filter',
  imports: [LucideAngularModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  dashService = inject(DashboardService)
}
