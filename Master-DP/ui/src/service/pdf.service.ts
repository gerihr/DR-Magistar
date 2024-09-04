import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BehaviorSubject } from 'rxjs';
import { font } from 'src/assets/fonts/font';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  chartData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  processedData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  opengeneratedPdf(eventName: string, eventDate: string, data: any[]) {
    const doc = new jsPDF();
  
    // Convert the ISO date to a readable format
    const formattedEventDate = this.formatDate(eventDate);
  
    doc.addFileToVFS('remixicon-normal.ttf', font);
    doc.addFont('remixicon-normal.ttf', 'remixicon', 'normal');
    doc.setFont('remixicon');
  
    // Add header
    doc.setFontSize(18);
    doc.text(`Събитие: ${eventName}`, 14, 20);
    doc.text(`Дата: ${formattedEventDate}`, 14, 30);
    
    // Define columns and data
    const columns = ['Name', 'Email', 'Number of Tickets'];
    const rows = data.map(item => [
      item.name,
      item.email,
      item.tickets.toString() // Number of tickets per email
    ]);
  
    // Add table to PDF
    autoTable(doc, {
      startY: 40,
      head: [columns],
      body: rows,
      theme: 'striped',
      styles: { font: 'remixicon' } // Apply custom font to the table
    });
  
    // Output the PDF in a new tab
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return date.toLocaleDateString('bg-BG', options); // Format the date in Bulgarian locale (or change the locale as needed)
  }
  
  processData(data: any[]) {
    this.processedData.next(this.prepareDataForPdf(data));
    this.chartData.next(this.convertToChartData(this.processedData.getValue()));
  }

  prepareDataForPdf(data: any[]) {
    const aggregatedData = data.reduce((acc, item) => {
      const email = item.userData.email;
      if (!acc[email]) {
        acc[email] = { name: item.userData.name, email, tickets: 0 };
      }
      acc[email].tickets += 1; // Increment ticket count
      return acc;
    }, {});

    return Object.values(aggregatedData);
  }

  convertToChartData(data: any[]) {
    // Process data for chart if needed
    return {
      labels: [], // Add chart labels
      datasets: [] // Add chart datasets
    };
  }

  generatePdf(eventName, eventDate) {
    this.opengeneratedPdf(eventName, eventDate, this.processedData.getValue());
  }
}
