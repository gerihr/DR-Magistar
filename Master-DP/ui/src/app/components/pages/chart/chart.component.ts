import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartData, ChartOptions } from 'chart.js';
import { catchError, EMPTY, of } from 'rxjs';
import { SharedService } from 'src/service/shared.service';
import { TicketService } from 'src/service/ticket.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class TicketChartComponent implements OnInit {
  chartData: ChartData<'bar'>;
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Дата'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Брой закупени билети'
        },
        ticks:{
          callback: function(value: number) {
            return Number.isInteger(value) ? value : ''; // Only display whole numbers
          }
        }
      }
    }
  };


  constructor(private ticketService: TicketService, private sharedService: SharedService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getTicketsByEvent(this.data.eventId); 
  }

  getTicketsByEvent(event_id: number): void {
    this.ticketService.getTicketList(event_id).pipe(
      catchError(err => {
        if(err.status !== 200){
          return EMPTY
        }
        else{
          this.sharedService.errorMessage(err.error)
          this.sharedService.isLoading(false)
          return of(err);
        }
        
      })
    ).subscribe(res=>{
      if(res.length==0){
        this.sharedService.errorMessage("За момента няма закупени билети")
      }
      else {
      const processedData = this.processData(res);
      this.chartData = {
        labels: processedData.labels,
        datasets: [{
          data: processedData.values,
          label: 'Билети',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      };
    }
      this.sharedService.isLoading(false);  
    });
  }

  processData(data: any[]) {
    const dateCounts: { [key: string]: number } = {};

    data.forEach(item => {
      if (item.date) {
        const date = new Date(item.date).toISOString().split('T')[0];
        dateCounts[date] = (dateCounts[date] || 0) + 1;
      }
    });

    const labels = Object.keys(dateCounts);
    const values = labels.map(label => dateCounts[label]);

    return { labels, values };
  }
}
