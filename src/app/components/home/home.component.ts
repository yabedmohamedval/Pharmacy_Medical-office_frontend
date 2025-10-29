import {Component, OnInit} from '@angular/core';
import {StatsService, StatsSummary} from "../../services/stats.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stats?: StatsSummary;
  loading = true;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.summary().subscribe({
      next: s => { this.stats = s; this.loading = false; },
      error: _ => { this.loading = false; }
    });
  }
}
