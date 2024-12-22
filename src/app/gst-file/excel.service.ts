import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(sheetData: { sheetName: string, jsonData: any[], summary?: { [key: string]: any } }[], fileName: string): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    sheetData.forEach(sheet => {
      let jsonData = sheet.jsonData;

      jsonData = this.filterOutIdField(jsonData);

      let summarySheetData: any[] = [];
      if (sheet.summary) {
        // Create summary data based on sheetName and summary
        switch (sheet.sheetName) {
          case 'B2B':
            summarySheetData = [
              // ['Summarry for B2B,SEZ,DE'],
              ['Unique GSTINs:', '', 'Number of Invoices:', '', 'Total Invoice Value:', '', '', '', '', '', '', 'Total Taxable Value:', 'Total Cess Amount:'],
              [sheet.summary['uniqueGSTINs'], '', sheet.summary['numberOfInvoices'], '', sheet.summary['totalInvoiceValue'], '', '', '', '', '', '', sheet.summary['totalTaxableValue'], sheet.summary['totalCessAmount']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;
          case 'B2CL':
            summarySheetData = [
              // ['Summary for B2CL(5)'],
              ['Number of Invoices:', '', 'Total Invoice Value:', '', '', '', 'Total Taxable Value:', 'Total Cess Amount'],
              [sheet.summary['numberOfInvoices'], '', sheet.summary['totalInvoiceValue'], '', '', '', sheet.summary['totalTaxableValue'], sheet.summary['totalCessAmount']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;
          case 'B2BA':
            summarySheetData = [
              // ['Summary for B2BA','Original Details','','','','','','','Revised Details'],
              ['Unique GSTINs:', '', 'Number of Invoices:', '', '', '', 'Total Invoice Value:', '', '', '', '', '', 'Total Taxable Value:', 'Total Cess Amount:'],
              [sheet.summary['uniqueGSTINs'], '', sheet.summary['numberOfInvoices'], '', '', '', sheet.summary['totalInvoiceValue'], '', '', '', '', '', sheet.summary['totalTaxableValue'], sheet.summary['totalCessAmount']],
              [], // Empty row for spacing
              ...this.convertJsonToArray(jsonData)
            ];
            break;
          case 'B2CLA':
            summarySheetData = [
              // ['Summary for B2CLA','Original Details','','','','','Revised Details'],
              ['Number of Invoices:', '', '', '', '', 'Total Invoice Value:', '', '', 'Total Taxable Value:', 'Total Cess Amount:'],
              [sheet.summary['numberOfInvoices'], '', '', '', '', sheet.summary['totalInvoiceValue'], '', '', sheet.summary['totalTaxableValue'], sheet.summary['totalCessAmount']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;
            break;
          case 'B2CS':
            summarySheetData = [
              // ['Summary for B2CS(7)'],
              ['', '', '', '', 'Total Taxable Value:', 'Total Cess Amount:'],
              ['', '', '', '', sheet.summary['totalTaxableValue'], sheet.summary['totalCessAmount']],
              [], // Empty row for spacing
              ...this.convertJsonToArray(jsonData)
            ];
            break;
            break;
          case 'B2CSA':
            summarySheetData = [
              // ['Summary For B2CSA','Original Details', '','','Revised Details'],
              ['', '', '', '', '', '', 'Total Taxable Value:', 'Total Cess Amount:'],
              ['', '', '', '', '', '', sheet.summary['totalTaxableValue'], sheet.summary['totalCessAmount']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;
          case 'CDNR':
            summarySheetData = [
              // ['Summary For CDNR(9B)'],
              ['Unique GSTINs:', '', '', '', '', '', '', '', 'Total Note Value:', '', '', 'Total Taxable Value:', 'Total Cess Amount:'],
              [sheet.summary['uniqueGSTINs'], '', '', '', '', '', '', '', sheet.summary['totalNoteValue'], '', '', sheet.summary['totalTaxableValue'], sheet.summary['totalCessAmount']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;
          case 'CDNRA':
            summarySheetData = [
              // ['Summary For CDNRA','','Original Details','','','','','','Revised Details'],
              ['Unique GSTINs:', '', 'No. of Notes/Vouchers:', '', '', '', '', '', '', '', 'Total Note Value:', '', '', 'Total Taxable Value:', 'Total Cess Amount:'],
              [sheet.summary['uniqueGSTINs'], '', sheet.summary['numberOfOriginalNotes'], '', '', '', '', '', '', '', sheet.summary['totalNoteValue'], '', '', sheet.summary['totalTaxableValue'], sheet.summary['totalCessAmount']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;
          case 'CDNUR':
            summarySheetData = [
              // ['Summary for CDNUR(9B)'],
              ['', 'No. of Original Notes:', '', '', '', 'Total Note Value:', '', '', 'Total Taxable Value:', 'Total Cess Amount:'],
              ['', sheet.summary['numberOfOriginalNotes'], '', '', '', sheet.summary['totalNoteValue'], '', '', sheet.summary['totalTaxableValue'], sheet.summary['totalCessAmount']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;

          case 'CDNURA':
            summarySheetData = [
              // ['Summary For CDNURA','Original Details','','','','','Revised Details'],
              ['No. of Original Notes:', '', '', '', '', '', '', '', '', '', 'Total Taxable Value:', 'Total Cess Amount:'],
              [sheet.summary['numberOfOriginalNotes'], '', '', '', '', '', '', '', '', '', sheet.summary['totalTaxableValue'], sheet.summary['totalCessAmount']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;

          case 'EXP':
            summarySheetData = [
              // ['Summary For EXP(6)'],
              ['', 'No. of Invoices:', '', 'Total Invoice Value:', '', 'No. of Shipping Bills:', '', '', 'Total Taxable Value:', 'Total Cess Amount:'],
              ['', sheet.summary['numberOfInvoices'], '', sheet.summary['totalInvoiceValue'], '', sheet.summary['numberOfShippingBills'], '', '', sheet.summary['totalTaxableValue'], sheet.summary['totalCessAmount']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;
          case 'EXPA':
            summarySheetData = [
              // ['Summary for EXPA','Original Details','','','','','Revised Details'],
              ['', '', '', '', '', '', 'Total Taxable Value:', 'Total Cess Amount:'],
              ['', '', '', '', '', '', sheet.summary['totalTaxableValue'], sheet.summary['totalCessAmount']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;

          case 'AR':
            summarySheetData = [
              // ['Summary For Advance Received(11B)'],
              ['', '', '', 'Total Advance Received', 'Total Cess'],
              ['', '', '', sheet.summary['totalAdvanceReceived'], sheet.summary['totalCessAmount']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;

          case 'ATA':
            summarySheetData = [
              // ['Summary For Ammended Tax Libality(AR)','Original Details','','','Revised Details'],
              ['', '', '', '', '', 'Total Advance Received', 'Total Cess'],
              ['', '', '', '', '', sheet.summary['totalAdvanceReceived'], sheet.summary['totalCessAmount']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;

          case 'ATADJ':
            summarySheetData = [
              // ['Summary For Avdvance Adjusted(11B)'],
              ['', '', '', 'Total Advance Adjusted', 'Total Cess'],
              ['', '', '', sheet.summary['totalAdvanceAdjusted'], sheet.summary['totalCessAmount']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;

          case 'ATADJA':
            summarySheetData = [
              // ['Summary For Amendement Of Adjustment Advances','','Original Details','','Revised Details'],
              ['', '', '', '', '', 'Total Advance Adjusted', 'Total Cess'],
              ['', '', '', '', '', sheet.summary['totalAdvanceAdjusted'], sheet.summary['totalCessAmount']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;

          case 'HSN':
            summarySheetData = [
              // ['Summary for HSN(12)'],
              ['No. of HSN:', '', '', '', 'Total Value:', '', 'Total Taxable Value:', 'Total Integrated Tax:', 'Total Central Tax:', 'Total State/UT Tax:', 'Total Cess Amount:'],
              [sheet.summary['numberOfHSN'], '', '', '', sheet.summary['totalValueHSN'], '', sheet.summary['totalTaxableValueHSN'], sheet.summary['totalIntegratedTaxHSN'], sheet.summary['totalCentralTaxHSN'], sheet.summary['totalStateUTTaxHSN'], sheet.summary['totalCessAmountHSN']],
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;

          case 'DOCS':
            summarySheetData = [
              // ['Summary of documents issued during the tax period (13)'],
              ['', '', '', 'Total Number', 'Total Cancelled'],
              ['', '', '', sheet.summary['totalNumberOfDOCS'], sheet.summary['totalCancelledDOCS']],
              [],
              ...this.convertJsonToArray(jsonData)
            ]
            break;

          default:
            summarySheetData = [
              [],
              ...this.convertJsonToArray(jsonData)
            ];
            break;
        }

        const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(summarySheetData);
        worksheet['!cols'] = this.autoSizeColumns(summarySheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheet.sheetName);
      } else {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
        worksheet['!cols'] = this.autoSizeColumns(this.convertJsonToArray(jsonData));
        XLSX.utils.book_append_sheet(workbook, worksheet, sheet.sheetName);
      }
    });

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private filterOutIdField(jsonData: any[]): any[] {
    return jsonData.map(item => {
      const { id, ...rest } = item;  // Destructure and exclude 'id'
      return rest;
    });
  }

  public saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}${EXCEL_EXTENSION}`);
  }

  private autoSizeColumns(data: any[]): any[] {
    if (data.length === 0) {
      return [];
    }

    // Determine column widths based on maximum content length in the data
    const maxLengths = data[0].map((_: any, colIndex: number) =>
      Math.max(...data.map((row: any) => (row[colIndex]?.toString().length || 0)))
    );


    return maxLengths.map((length: number) => ({ wch: length + 2 }));
  }


  private convertJsonToArray(jsonData: any[]): any[] {
    if (jsonData.length === 0) return [];

    const headers = Object.keys(jsonData[0]);
    const dataArray = jsonData.map((row: any) => headers.map(header => row[header]));

    return [headers, ...dataArray];
  }
}
