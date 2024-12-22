import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GstFileService } from '../gst-file.service';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-download-history',
  templateUrl: './download-history.component.html',
  styleUrls: ['./download-history.component.scss']
})
export class DownloadHistoryComponent implements OnInit {
  downloadHistory: any[] = [];

  constructor(
    private gstFileService: GstFileService,
    private excelService: ExcelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDownloadHistory();
  }

  getDownloadHistory(): void {
    this.gstFileService.getDownloadHistory().subscribe(
      (data: any[]) => {
        this.downloadHistory = data;
      },
      error => {
        console.error('Error fetching download history:', error);
      }
    );
  }

  reDownloadFile(record: any): void {
    this.gstFileService.reDownloadFile(record.id).subscribe(
      data => {
        console.log('Data fetched for redownload:', data); // Add this line
        if (data) {
          const sheetData = [{ sheetName: record.fileName, jsonData: data }];
          this.excelService.exportAsExcelFile(sheetData, record.fileName);
        } else {
          console.error('Fetched data is undefined or null.');
        }
      },
      error => {
        console.error('Error fetching file details for redownload:', error);
      }
    );
}



  goBack(): void {
    this.router.navigate(['/gst']);
  }
}
