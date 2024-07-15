import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { allTransaction } from 'src/app/models/ITransaction';

@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.scss']
})
export class TransactionChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() transactions: allTransaction = [];

  chart: Chart | null = null; 

  constructor() {}

  ngAfterViewInit(): void {
    if (this.transactions.length > 0) {
      this.renderChart();
    }
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.chart.destroy(); // Destroy existing chart if it exists
    }
    if (this.transactions.length > 0) {
      this.renderChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy(); // Ensure chart is destroyed when component is destroyed
    }
  }

  renderChart(): void {
    const labels = this.transactions.map(transaction => transaction.date);
    const data = this.transactions.map(transaction => transaction.amount);
    console.log(this.transactions)
    console.log(labels)
    console.log(data)
  
  
    this.chart = new Chart('Transactions', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Transactions',
          data: data,
          fill: false,
      borderColor: '#3252dfda',
      tension: 0.1
        }]
      }
    });
  }

}

