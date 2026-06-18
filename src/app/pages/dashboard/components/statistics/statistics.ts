import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-statistics',
  imports: [LucideAngularModule],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics {
  dashService = inject(DashboardService)
}