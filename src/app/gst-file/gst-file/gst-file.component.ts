import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../excel.service';
import { GstFileService } from '../gst-file.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gst-file',
  templateUrl: './gst-file.component.html',
  styleUrls: ['./gst-file.component.scss']
})
export class GstFileComponent implements OnInit {
  downloadCount: number = 0;
  downloadHistory: any[] = [];
  // Updated property name
  b2bDetails: any[] = [];
  b2clDetails: any[] = [];
  b2baDetails: any[] = [];
  b2claDetails: any[] = [];
  b2csDetails: any[] = [];
  b2csaDetails: any[] = [];
  cdnrDetails: any[] = [];
  cdnraDetails: any[] = [];
  cdnurDetails: any[] = [];
  cdnuraDetails: any[] = [];
  expDetails: any[] = [];
  expaDetails: any[] = [];
  arDetails: any[] = [];
  ataDetails: any[] = [];
  atadjDetails: any[] = [];
  atadjaDetails: any[] = [];
  hsnDetails: any[] = [];
  docsDetails: any[] = [];

  // B2B Summary
  uniqueGSTINb2b: number = 0;
  numberOfInvoicesb2b: number = 0;
  totalInvoiceValueb2b: number = 0;
  totalTaxableValueb2b: number = 0;
  totalCessAmountb2b: number = 0;

  // B2CL Summary
  numberOfInvoicesb2cl: number = 0;
  totalInvoiceValueb2cl: number = 0;
  totalTaxableValueb2cl: number = 0;
  totalCessAmountb2cl: number = 0;

  // B2BA Summary
  uniqueGSTINsB2BA: number = 0;
  numberOfInvoicesB2BA: number = 0;
  totalInvoiceValueB2BA: number = 0;
  rateB2BA: number = 0;
  totalTaxableValueB2BA: number = 0;
  totalCessAmountB2BA: number = 0;

  // B2CLA Summary
  numberOfInvoicesB2CLA: number = 0;
  totalInvoiceValueB2CLA: number = 0;
  totalTaxableValueB2CLA: number = 0;
  totalCessAmountB2CLA: number = 0;

  // B2CS Summary
  totalTaxableValueB2CS: number = 0;
  totalCessAmountB2CS: number = 0;

  // B2CSA Summary
  totalTaxableValueB2CSA: number = 0;
  totalCessAmountB2CSA: number = 0;

  // CDNR Summary
  uniqueGSTINsCDNR: number = 0;
  numberOfInvoicesCDNR: number = 0;
  totalNoteValueCDNR: number = 0;
  totalTaxableValueCDNR: number = 0;
  totalCessAmountCDNR: number = 0;

  //cdnra
  uniqueGSTINsCDNRA: number = 0;
  numberOfOriginalNotesCDNRA: number = 0;
  totalNoteValueCDNRA: number = 0;
  totalTaxableValueCDNRA: number = 0;
  totalCessAmountCDNRA: number = 0;

  //cdnur
  noOfOriginalNoteNumber: number = 0;
  totalNoteValue: number = 0;
  totalTaxableValue: number = 0;
  totalCessAmount: number = 0;

  //cdnura
  noOfOriginalNoteNumberCDNURA: number = 0;
  totalNoteValueCDNURA: number = 0;
  totalTaxableValueCDNURA: number = 0;
  totalCessAmountCDNURA: number = 0;

  //exp
  noOfInvoicesEXP: number = 0;
  totalInvoiceValueEXP: number = 0;
  noOfShippingBillsEXP: number = 0;
  totalTaxableValueEXP: number = 0;
  totalCessAmountEXP: number = 0;

  //expa
  noOfInvoicesEXPA: number = 0;
  totalInvoiceValueEXPA: number = 0;
  noOfShippingBillsEXPA: number = 0;
  totalTaxableValueEXPA: number = 0;
  totalCessAmountEXPA: number = 0;

  //ar
  totalAdvanceReceivedAR: number = 0;
  totalCessAmountAR: number = 0;

  //ata
  totalAdvanceReceivedATA: number = 0;
  totalCessAmountATA: number = 0;

  //atadj
  totalAdvanceAdjustedATADJ: number = 0;
  totalCessAmountATADJ: number = 0;

  //atadja
  totalAdvanceAdjustedATADJA: number = 0;
  totalCessAmountATADJA: number = 0;

  //hsn
  numberOfHSN: number = 0;
  totalValueHSN: number = 0;
  totalTaxableValueHSN: number = 0;
  totalIntegratedTaxHSN: number = 0;
  totalCentralTaxHSN: number = 0;
  totalStateUTTaxHSN: number = 0;
  totalCessAmountHSN: number = 0;

  //docs
  totalNumberOfDOCS: number = 0;
  totalCancelledDOCS: number = 0;


  constructor(private gstFileService: GstFileService, private excelService: ExcelService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getB2BData();
    this.getB2clData();
    this.getB2baData();
    this.getB2claData();
    this.getB2csData();
    this.getB2csaData();
    this.getCdnrData();
    this.getCdnraData();
    this.getCdnurData();
    this.getCdnuraData();
    this.getExpData();
    this.getExpaData();
    this.getArData();
    this.getAtaData();
    this.getAtadjData();
    this.getAtadjaData();
    this.getHsnData();
    this.getDocsData();
  }

  getB2BData(): void {
    this.gstFileService.getGstDetails().subscribe(
      (data: any[]) => {
        this.b2bDetails = data;
        this.calculateB2BSummary();
      },
      (error: any) => {
        console.error('Error fetching B2B data:', error);
      }
    );
  }



  getB2clData(): void {
    this.gstFileService.getGst2Details().subscribe(
      (data: any[]) => {
        this.b2clDetails = data;
        this.calculateB2CLSummary();
      },
      (error: any) => {
        console.error('Error fetching B2CL data:', error);
      }
    );
  }

  getB2baData(): void {
    this.gstFileService.getGst3Details().subscribe(
      (data: any[]) => {
        this.b2baDetails = data;
        this.calculateB2BASummary();
      },
      (error: any) => {
        console.error('Error fetching B2BA data:', error);
      }
    );
  }

  getB2claData(): void {
    this.gstFileService.getGst4Details().subscribe(
      (data: any[]) => {
        this.b2claDetails = data;
        this.calculateB2CLASummary();
      },
      (error: any) => {
        console.error('Error fetching B2CLA data:', error);
      }
    );
  }

  getB2csData(): void {
    this.gstFileService.getGst5Details().subscribe(
      (data: any[]) => {
        this.b2csDetails = data;
        this.calculateB2CSSummary();
      },
      (error: any) => {
        console.error('Error fetching B2CS data:', error);
      }
    );
  }


  getB2csaData(): void {
    this.gstFileService.getGst6Details().subscribe(
      (data: any[]) => {
        this.b2csaDetails = data;
        this.calculateB2CSASummary();
      },
      (error: any) => {
        console.error('Error fetching B2CSA data:', error);
      }
    );
  }

  getCdnrData(): void {
    this.gstFileService.getGst7Details().subscribe(
      (data: any[]) => {
        this.cdnrDetails = data;
        this.calculateCDNRSummary();
      },
      (error: any) => {
        console.error('Error fetching CDNR data:', error);
      }
    );
  }

  getCdnraData(): void {
    this.gstFileService.getGst8Details().subscribe(
      (data: any[]) => {
        this.cdnraDetails = data;
        this.calculateCDNRASummary();
      },
      (error: any) => {
        console.error('Error fetching CDNRA data:', error);
      }
    );
  }

  getCdnurData(): void {
    this.gstFileService.getGst9Details().subscribe(
      (data: any[]) => {
        this.cdnurDetails = data;
        this.calculateCDNURSummary();
      },
      (error: any) => {
        console.error('Error fetching CDNUR data:', error);
      }
    );
  }

  getCdnuraData(): void {
    this.gstFileService.getGst10Details().subscribe(
      (data: any[]) => {
        this.cdnuraDetails = data;
        this.calculateCDNURASummary();
      },
      (error: any) => {
        console.error('Error fetching CDNURA data:', error);
      }
    );
  }

  getExpData(): void {
    this.gstFileService.getGst11Details().subscribe(
      (data: any[]) => {
        this.expDetails = data;
        this.calculateEXPSummary();
      },
      (error: any) => {
        console.error('Error fetching export data:', error)
      }
    )
  }

  getExpaData(): void {
    this.gstFileService.getGst12Details().subscribe(
      (data: any[]) => {
        this.expaDetails = data;
        this.calculateEXPASummary();
      },
      (error: any) => {
        console.error('Error fetching exportA data:', error)
      }
    )
  }

  getArData(): void {
    this.gstFileService.getGst13Details().subscribe(
      (data: any[]) => {
        this.arDetails = data;
        this.calculateARSummary();
      },
      (error: any) => {
        console.error('Error fetching AR data:', error)
      }
    )
  }

  getAtaData(): void {
    this.gstFileService.getGst14Details().subscribe(
      (data: any[]) => {
        this.ataDetails = data;
        this.calculateATASummary();
      },
      (error: any) => {
        console.error('Error fetching ATA data:', error)
      }
    )
  }

  getAtadjData(): void {
    this.gstFileService.getGst15Details().subscribe(
      (data: any[]) => {
        this.atadjDetails = data;
        this.calculateATADJSummary();
      },
      (error: any) => {
        console.error('Error fetching ATADJ data:', error)
      }
    )
  }

  getAtadjaData(): void {
    this.gstFileService.getGst16Details().subscribe(
      (data: any[]) => {
        this.atadjaDetails = data;
        this.calculateATADJASummary();
      },
      (error: any) => {
        console.error('Error fetching ATADJA data:', error)
      }
    )
  }

  getHsnData(): void {
    this.gstFileService.getGst17Details().subscribe(
      (data: any[]) => {
        this.hsnDetails = data;
        this.calculateHSNSummary();
      },
      (error: any) => {
        console.error('Error fetching HSN data:', error)
      }
    )
  }

  getDocsData(): void {
    this.gstFileService.getGst18Details().subscribe(
      (data: any[]) => {
        this.docsDetails = data;
        this.calculateDocsSummary();
      },
      (error: any) => {
        console.error('Error fetching Docs data:', error)
      }
    )
  }

  calculateB2BSummary(): void {
    this.uniqueGSTINb2b = new Set(this.b2bDetails.map(item => item.GSTIN_UIN_of_Recipient)).size;
    this.numberOfInvoicesb2b = this.b2bDetails.length;
    this.totalInvoiceValueb2b = this.b2bDetails.reduce((acc, b2b) => acc + (parseFloat(b2b.Invoice_Value) || 0), 0).toFixed(2);
    this.totalTaxableValueb2b = this.b2bDetails.reduce((acc, b2b) => acc + (parseFloat(b2b.Taxable_Value) || 0), 0).toFixed(2);
    this.totalCessAmountb2b = this.b2bDetails.reduce((acc, b2b) => acc + (parseFloat(b2b.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateB2CLSummary(): void {
    this.numberOfInvoicesb2cl = this.b2clDetails.length;
    this.totalInvoiceValueb2cl = this.b2clDetails.reduce((acc, b2cl) => acc + (parseFloat(b2cl.Invoice_Value) || 0), 0).toFixed(2);
    this.totalTaxableValueb2cl = this.b2clDetails.reduce((acc, b2cl) => acc + (parseFloat(b2cl.Taxable_Value) || 0), 0).toFixed(2);
    this.totalCessAmountb2cl = this.b2clDetails.reduce((acc, b2cl) => acc + (parseFloat(b2cl.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateB2BASummary(): void {
    this.uniqueGSTINsB2BA = new Set(this.b2baDetails.map(item => item.GSTIN_UIN_of_Recipient)).size;
    this.numberOfInvoicesB2BA = this.b2baDetails.length;
    this.totalInvoiceValueB2BA = this.b2baDetails.reduce((acc, b2ba) => acc + (parseFloat(b2ba.Invoice_Value) || 0), 0).toFixed(2);
    this.rateB2BA = this.b2baDetails.reduce((acc, b2ba) => acc + (parseFloat(b2ba.Applicable_Percent_of_Tax_Rate) || 0), 0).toFixed(2);
    this.totalTaxableValueB2BA = this.b2baDetails.reduce((acc, b2ba) => acc + (parseFloat(b2ba.Taxable_Value) || 0), 0).toFixed(2);
    this.totalCessAmountB2BA = this.b2baDetails.reduce((acc, b2ba) => acc + (parseFloat(b2ba.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateB2CLASummary(): void {
    this.numberOfInvoicesB2CLA = this.b2claDetails.length;
    this.totalInvoiceValueB2CLA = this.b2claDetails.reduce((acc, b2cla) => acc + (parseFloat(b2cla.Invoice_Value) || 0), 0).toFixed(2);
    this.totalTaxableValueB2CLA = this.b2claDetails.reduce((acc, b2cla) => acc + (parseFloat(b2cla.Taxable_Value) || 0), 0).toFixed(2);
    this.totalCessAmountB2CLA = this.b2claDetails.reduce((acc, b2cla) => acc + (parseFloat(b2cla.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateB2CSSummary(): void {
    this.totalTaxableValueB2CS = this.b2csDetails.reduce((acc, b2cs) => acc + (parseFloat(b2cs.Taxable_Value) || 0), 0).toFixed(2);
    this.totalCessAmountB2CS = this.b2csDetails.reduce((acc, b2cs) => acc + (parseFloat(b2cs.Cess_Amount) || 0), 0).toFixed(2);
  }


  calculateB2CSASummary(): void {
    this.totalTaxableValueB2CSA = this.b2csaDetails.reduce((acc, b2csa) => acc + (parseFloat(b2csa.Taxable_Value) || 0), 0).toFixed(2);
    this.totalCessAmountB2CSA = this.b2csaDetails.reduce((acc, b2csa) => acc + (parseFloat(b2csa.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateCDNRSummary(): void {
    this.uniqueGSTINsCDNR = new Set(this.cdnrDetails.map(item => item.GSTIN_UIN_of_Recipient)).size;
    this.numberOfInvoicesCDNR = this.cdnrDetails.length;
    this.totalNoteValueCDNR = this.cdnrDetails.reduce((acc, cdnr) => acc + (parseFloat(cdnr.Note_Value) || 0), 0).toFixed(2);
    this.totalTaxableValueCDNR = this.cdnrDetails.reduce((acc, cdnr) => acc + (parseFloat(cdnr.Taxable_Value) || 0), 0).toFixed(2);
    this.totalCessAmountCDNR = this.cdnrDetails.reduce((acc, cdnr) => acc + (parseFloat(cdnr.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateCDNRASummary(): void {
    const uniqueGSTINs = new Set(this.cdnraDetails.map(item => item.GSTIN_UIN_of_Recipient));
    this.uniqueGSTINsCDNRA = uniqueGSTINs.size;

    this.numberOfOriginalNotesCDNRA = this.cdnraDetails.filter(item => item.Original_Note_Number).length;

    this.totalNoteValueCDNRA = this.cdnraDetails.reduce((acc, item) => acc + (parseFloat(item.Note_Value) || 0), 0).toFixed(2);

    this.totalTaxableValueCDNRA = this.cdnraDetails.reduce((acc, item) => acc + (parseFloat(item.Taxable_Value) || 0), 0).toFixed(2);

    this.totalCessAmountCDNRA = this.cdnraDetails.reduce((acc, item) => acc + (parseFloat(item.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateCDNURSummary(): void {
    this.noOfOriginalNoteNumber = this.cdnurDetails.length;
    this.totalNoteValue = this.cdnurDetails.reduce((acc, cdnur) => acc + (parseFloat(cdnur.Note_Value) || 0), 0).toFixed(2);
    this.totalTaxableValue = this.cdnurDetails.reduce((acc, cdnur) => acc + (parseFloat(cdnur.Taxable_Value) || 0), 0).toFixed(2);
    this.totalCessAmount = this.cdnurDetails.reduce((acc, cdnur) => acc + (parseFloat(cdnur.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateCDNURASummary(): void {
    this.noOfOriginalNoteNumberCDNURA = this.cdnuraDetails.length;
    this.totalTaxableValueCDNURA = this.cdnuraDetails.reduce((sum, cdnura) => sum + (parseFloat(cdnura.Taxable_Value) || 0), 0).toFixed(2);
    this.totalCessAmountCDNURA = this.cdnuraDetails.reduce((sum, cdnura) => sum + (parseFloat(cdnura.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateEXPSummary(): void {
    this.noOfInvoicesEXP = this.expDetails.length;

    this.totalInvoiceValueEXP = this.expDetails.reduce((sum, exp) => sum + (parseFloat(exp.Invoice_Value) || 0), 0).toFixed(2);
    this.noOfShippingBillsEXP = this.expDetails.filter(exp => exp.Shipping_Bill_Number).length;
    this.totalTaxableValueEXP = this.expDetails.reduce((sum, exp) => sum + (parseFloat(exp.Taxable_Value) || 0), 0).toFixed(2);
    this.totalCessAmountEXP = this.expDetails.reduce((sum, exp) => sum + (parseFloat(exp.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateEXPASummary(): void {
    this.noOfInvoicesEXPA = this.expaDetails.length;

    this.noOfShippingBillsEXPA = this.expaDetails.filter(expa => expa.Shipping_Bill_Number).length;

    this.totalTaxableValueEXPA = this.expaDetails.reduce((sum, expa) => sum + (parseFloat(expa.Taxable_Value) || 0), 0).toFixed(2);

    this.totalCessAmountEXPA = this.expaDetails.reduce((sum, expa) => sum + (parseFloat(expa.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateARSummary(): void {
    this.totalAdvanceReceivedAR = this.arDetails.reduce((sum, ar) => sum + (parseFloat(ar.Gross_Advance_Received) || 0), 0);
    this.totalCessAmountAR = this.arDetails.reduce((sum, ar) => sum + (parseFloat(ar.Cess_Amount) || 0), 0);
  }

  calculateATASummary(): void {
    this.totalAdvanceReceivedATA = this.ataDetails.reduce((sum, ata) => sum + (parseFloat(ata.Gross_Advance_Received) || 0), 0).toFixed(2);
    this.totalCessAmountATA = this.ataDetails.reduce((sum, ata) => sum + (parseFloat(ata.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateATADJSummary(): void {
    this.totalAdvanceAdjustedATADJ = this.atadjDetails.reduce((sum, atadj) => sum + (parseFloat(atadj.Gross_Advance_Adjusted) || 0), 0).toFixed(2);
    this.totalCessAmountATADJ = this.atadjDetails.reduce((sum, atadj) => sum + (parseFloat(atadj.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateATADJASummary(): void {
    this.totalAdvanceAdjustedATADJA = this.atadjaDetails.reduce((sum, atadja) => sum + (parseFloat(atadja.Gross_Advance_Adjusted) || 0), 0).toFixed(2);
    this.totalCessAmountATADJA = this.atadjaDetails.reduce((sum, atadja) => sum + (parseFloat(atadja.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateHSNSummary(): void {
    this.numberOfHSN = this.hsnDetails.length;
    this.totalValueHSN = this.hsnDetails.reduce((sum, hsn) => sum + (parseFloat(hsn.Total_Value) || 0), 0).toFixed(2);
    this.totalTaxableValueHSN = this.hsnDetails.reduce((sum, hsn) => sum + (parseFloat(hsn.Taxable_Value) || 0), 0).toFixed(2);
    this.totalIntegratedTaxHSN = this.hsnDetails.reduce((sum, hsn) => sum + (parseFloat(hsn.Integrated_Tax_Amount) || 0), 0).toFixed(2);
    this.totalCentralTaxHSN = this.hsnDetails.reduce((sum, hsn) => sum + (parseFloat(hsn.Central_Tax_Amount) || 0), 0).toFixed(2);
    this.totalStateUTTaxHSN = this.hsnDetails.reduce((sum, hsn) => sum + (parseFloat(hsn.State_UT_Tax_Amount) || 0), 0).toFixed(2);
    this.totalCessAmountHSN = this.hsnDetails.reduce((sum, hsn) => sum + (parseFloat(hsn.Cess_Amount) || 0), 0).toFixed(2);
  }

  calculateDocsSummary(): void {
    this.totalNumberOfDOCS = this.docsDetails.reduce((sum, doc) => sum + (parseFloat(doc.Total_Number) || 0), 0).toFixed(2);
    this.totalCancelledDOCS = this.docsDetails.reduce((sum, doc) => sum + (parseFloat(doc.Cancelled) || 0), 0).toFixed(2);
  }


  exportAsXLSX(): void {
    const formatDetails = (details: any[], dateFields: string[] = []): any[] => {
      return details.map(item => {
        const formattedItem = { ...item };
        dateFields.forEach(field => {
          if (formattedItem[field]) {
            formattedItem[field] = this.datePipe.transform(formattedItem[field], 'dd-MMM-yyyy');
          }
        });
        return formattedItem;
      });
    };

    const mapB2BDetails = (b2bDetails: any[]): any[] => {
      return b2bDetails.map(item => ({
        'GSTIN/UIN of Recipient': item.GSTIN_UIN_of_Recipient,
        'Receiver Name': item.Receiver_Name,
        'Invoice Number': item.Invoice_Number,
        'Invoice Date': item.Invoice_Date,
        'Invoice Value': item.Invoice_Value,
        'Place of Supply': item.Place_of_Supply,
        'Reverse Charge': item.Reverse_Charge,
        'Applicable % of Tax Rate': item.Applicable_Percent_of_Tax_Rate,
        'Invoice Type': item.Invoice_Type,
        'E-commerce GSTIN': item.Ecommerce_GSTIN,
        'Rate': item.Rate,
        'Taxable Value': item.Taxable_Value,
        'Cess Amount': item.Cess_Amount
      }));
    };

    const mapB2BADetails = (b2baDetails: any[]): any[] => {
      return b2baDetails.map(item => ({
        'GSTIN/UIN of Recipient': item.GSTIN_UIN_of_Recipient,
        'Receiver Name': item.Receiver_Name,
        'Original Invoice Number': item.Original_Invoice_Number,
        'Original Invoice Date': item.Original_Invoice_Date,
        'Revised Invoice Number': item.Revised_Invoice_Number,
        'Revised Invoice Date': item.Revised_Invoice_Date,
        'Invoice Value': item.Invoice_Value,
        'Place of Supply': item.Place_of_Supply,
        'Reverse Charge': item.Reverse_Charge,
        'Applicable % of Tax Rate': item.Applicable_Percent_of_Tax_Rate,
        'Invoice Type': item.Invoice_Type,
        'E-commerce GSTIN': item.Ecommerce_GSTIN,
        'Taxable Value': item.Taxable_Value,
        'Cess Amount': item.Cess_Amount
      }));
    };

    const mapB2CLDetails = (b2clDetails: any[]): any[] => {
      return b2clDetails.map(item => ({
        'Invoice Number': item.Invoice_Number,
        'Invoice Date': item.Invoice_Date,
        'Invoice Value': item.Invoice_Value,
        'Place of Supply': item.Place_of_Supply,
        'Applicable % of Tax Rate': item.Applicable_Percent_of_Tax_Rate,
        'Rate': item.Rate,
        'Taxable Value': item.Taxable_Value,
        'Cess Amount': item.Cess_Amount,
        'E-commerce GSTIN': item.Ecommerce_GSTIN
      }));
    };

    const mapB2CLADetails = (b2claDetails: any[]): any[] => {
      return b2claDetails.map(item => ({
        'Original Invoice Number': item.Original_Invoice_Number,
        'Original Invoice Date': item.Original_Invoice_Date,
        'Original Place of Supply': item.Original_Place_of_Supply,
        'Revised Invoice Number': item.Revised_Invoice_Number,
        'Revised Invoice Date': item.Revised_Invoice_Date,
        'Invoice Value': item.Invoice_Value,
        'Applicable % of Tax Rate': item.Applicable_Percent_of_Tax_Rate,
        'Rate': item.Rate,
        'Taxable Value': item.Taxable_Value,
        'Cess Amount': item.Cess_Amount,
        'E-commerce GSTIN': item.Ecommerce_GSTIN
      }));
    };

    const mapB2CSAData = (b2csaDetails: any[]): any[] => {
      return b2csaDetails.map(item => ({
        'Financial Year': item.Financial_Year,
        'Original Month': item.Original_Month,
        'Place of Supply': item.Place_of_Supply,
        'Type': item.Type,
        'Applicable % of Tax Rate': item.Applicable_Percent_of_Tax_Rate,
        'Rate': item.Rate,
        'Taxable Value': item.Taxable_Value,
        'Cess Amount': item.Cess_Amount,
        'E-commerce GSTIN': item.Ecommerce_GSTIN
      }));
    };

    const mapB2CSDetails = (b2csDetails: any[]): any[] => {
      return b2csDetails.map(item => ({
        'Type': item.Type,
        'Place Of Supply': item.Place_of_Supply,
        'Applicable % of Tax Rate': item.Applicable_Percent_of_Tax_Rate,
        'Rate': item.Rate,
        'Taxable Value': item.Taxable_Value,
        'Cess Amount': item.Cess_Amount,
        'E-commerce GSTIN': item.Ecommerce_GSTIN
      }));
    };

    const mapCDNRData = (cdnrDetails: any[]): any[] => {
      return cdnrDetails.map(item => ({
        'GSTIN/UIN of Recipient': item.GSTIN_UIN_of_Recipient,
        'Receiver Name': item.Receiver_Name,
        'Note Number': item.Note_Number,
        'Note Date': item.Note_Date,
        'Note Type': item.Note_Type,
        'Place of Supply': item.Place_of_Supply,
        'Reverse Charge': item.Reverse_Charge,
        'Note Supply Type': item.Note_Supply_Type,
        'Note Value': item.Note_Value,
        'Applicable % of Tax Rate': item.Applicable_Percent_of_Tax_Rate,
        'Rate': item.Rate,
        'Taxable Value': item.Taxable_Value,
        'Cess Amount': item.Cess_Amount
      }));
    };

    const mapCDNRAData = (cdnraDetails: any[]): any[] => {
      return cdnraDetails.map(item => ({
        'GSTIN/UIN of Recipient': item.GSTIN_UIN_of_Recipient,
        'Receiver Name': item.Receiver_Name,
        'Original Note Number': item.Original_Note_Number,
        'Original Note Date': item.Original_Note_Date,
        'Revised Note Number': item.Revised_Note_Number,
        'Revised Note Date': item.Revised_Note_Date,
        'Note Type': item.Note_Type,
        'Place of Supply': item.Place_of_Supply,
        'Reverse Charge': item.Reverse_Charge,
        'Note Supply Type': item.Note_Supply_Type,
        'Note Value': item.Note_Value,
        'Applicable % of Tax Rate': item.Applicable_Percent_of_Tax_Rate,
        'Rate': item.Rate,
        'Taxable Value': item.Taxable_Value,
        'Cess Amount': item.Cess_Amount
      }));
    };

    const mapCDNURData = (cdnurDetails: any[]): any[] => {
      return cdnurDetails.map(item => ({
        'UR Type': item.UR_Type,
        'Note Number': item.Note_Number,
        'Note Date': item.Note_Date,
        'Note Type': item.Note_Type,
        'Place of Supply': item.Place_of_Supply,
        'Note Value': item.Note_Value,
        'Applicable % of Tax Rate': item.Applicable_Percent_of_Tax_Rate,
        'Rate': item.Rate,
        'Taxable Value': item.Taxable_Value,
        'Cess Amount': item.Cess_Amount
      }));
    };

    const mapCDNURAData = (cdnuraDetails: any[]): any[] => {
      return cdnuraDetails.map(item => ({
        'UR Type': item.UR_Type,
        'Original Note Number': item.Original_Note_Number,
        'Original Note Date': item.Original_Note_Date,
        'Revised Note Number': item.Revised_Note_Number,
        'Revised Note Date': item.Revised_Note_Date,
        'Note Type': item.Note_Type,
        'Place of Supply': item.Place_of_Supply,
        'Note Value': item.Note_Value,
        'Applicable % of Tax Rate': item.Applicable_Percent_of_Tax_Rate,
        'Rate': item.Rate,
        'Taxable Value': item.Taxable_Value,
        'Cess Amount': item.Cess_Amount
      }));
    };

    const mapExpData = (expDetails: any[]): any[] => {
      return expDetails.map(item => ({
        'Export Type': item.Export_Type,
        'Invoice Number': item.Invoice_Number,
        'Invoice Date': item.Invoice_Date,
        'Invoice Value': item.Invoice_Value,
        'Port Code': item.Port_Code,
        'Shipping Bill Number': item.Shipping_Bill_Number,
        'Shipping Bill Date': item.Shipping_Bill_Date,
        'Rate': item.Rate,
        'Taxable Value': item.Taxable_Value,
        'Cess Amount': item.Cess_Amount
      }));
    };

    const mapExpaData = (expaDetails: any[]): any[] => {
      return expaDetails.map(item => ({
        'Export Type': item.Export_Type,
        'Original Invoice Number': item.Original_Invoice_Number,
        'Original Invoice Date': item.Original_Invoice_Date,
        'Revised Invoice Number': item.Revised_Invoice_Number,
        'Revised Invoice Date': item.Revised_Invoice_Date,
        'Invoice Value': item.Invoice_Value,
        'Port Code': item.Port_Code,
        'Shipping Bill Number': item.Shipping_Bill_Number,
        'Shipping Bill Date': item.Shipping_Bill_Date,
        'Rate': item.Rate,
        'Taxable Value': item.Taxable_Value,
        'Cess Amount': item.Cess_Amount
      }));
    };

    const mapArData = (arDetails: any[]): any[] => {
      return arDetails.map(item => ({
        'Place of Supply': item.Place_of_Supply,
        'Applicable % of Tax Rate': item.Applicable_Percent_of_Tax_Rate,
        'Rate': item.Rate,
        'Gross Advance Received': item.Gross_Advance_Received,
        'Cess Amount': item.Cess_Amount
      }));
    };

    const mapAtaData = (ataDetails: any[]): any[] => {
      return ataDetails.map(item => ({
        'Financial Year': item.Financial_Year,
        'Original Month': item.Original_Month,
        'Original Place of Supply': item.Original_Place_of_Supply,
        'Applicable % of Tax Rate': item.Applicable_Percent_of_Tax_Rate,
        'Rate': item.Rate,
        'Gross Advance Received': item.Gross_Advance_Received,
        'Cess Amount': item.Cess_Amount
      }));
    };

    const mapAtadjData = (atadjDetails: any[]): any[] => {
      return atadjDetails.map(item => ({
        'Place of Supply': item.Place_of_Supply,
        'Applicable % of Tax Rate': item.Applicable_Percent_of_Tax_Rate,
        'Rate': item.Rate,
        'Gross Advance Adjusted': item.Gross_Advance_Adjusted,
        'Cess Amount': item.Cess_Amount
      }));
    };

    const mapAtadjaData = (atadjaDetails: any[]): any[] => {
      return atadjaDetails.map(item => ({
        'Financial Year': item.Financial_Year,
        'Original Month': item.Original_Month,
        'Original Place of Supply': item.Original_Place_of_Supply,
        'Applicable % of Tax Rate': item.Applicable_Percent_of_Tax_Rate,
        'Rate': item.Rate,
        'Gross Advance Adjusted': item.Gross_Advance_Adjusted,
        'Cess Amount': item.Cess_Amount
      }));
    };

    const mapHsnData = (hsnDetails: any[]): any[] => {
      return hsnDetails.map(item => ({
        'HSN': item.HSN,
        'Description': item.Description,
        'UQC': item.UQC,
        'Total Quantity': item.Total_Quantity,
        'Total Value': item.Total_Value,
        'Rate': item.Rate,
        'Taxable Value': item.Taxable_Value,
        'Integrated Tax Amount': item.Integrated_Tax_Amount,
        'Central Tax Amount': item.Central_Tax_Amount,
        'State/UT Tax Amount': item.State_UT_Tax_Amount,
        'Cess Amount': item.Cess_Amount
      }));
    };

    const mapDocsData = (docsDetails: any[]): any[] => {
      return docsDetails.map(item => ({
        'Nature of Document': item.Nature_of_Document,
        'Sr.No.From': item.Sr_No_From,
        'Sr.No.To': item.Sr_No_To,
        'Total Number': item.Total_Number,
        'Cancelled': item.Cancelled
      }));
    };


    const sheetData = [
      {
        sheetName: 'B2B',
        jsonData: mapB2BDetails(formatDetails(this.b2bDetails, ['Invoice_Date'])),
        summary: {
          uniqueGSTINs: this.uniqueGSTINb2b,
          numberOfInvoices: this.numberOfInvoicesb2b,
          totalInvoiceValue: this.totalInvoiceValueb2b,
          totalTaxableValue: this.totalTaxableValueb2b,
          totalCessAmount: this.totalCessAmountb2b
        }
      },
      {
        sheetName: 'B2BA',
        jsonData: mapB2BADetails(formatDetails(this.b2baDetails, ['Original_Invoice_Date', 'Revised_Invoice_Date'])),
        summary: {
          uniqueGSTINs: this.uniqueGSTINsB2BA,
          numberOfInvoices: this.numberOfInvoicesB2BA,
          totalInvoiceValue: this.totalInvoiceValueB2BA,
          rate: this.rateB2BA,
          totalTaxableValue: this.totalTaxableValueB2BA,
          totalCessAmount: this.totalCessAmountB2BA
        }
      },
      {
        sheetName: 'B2CL',
        jsonData: mapB2CLDetails(formatDetails(this.b2clDetails, ['Invoice_Date'])),
        summary: {
          numberOfInvoices: this.numberOfInvoicesb2cl,
          totalInvoiceValue: this.totalInvoiceValueb2cl,
          totalTaxableValue: this.totalTaxableValueb2cl,
          totalCessAmount: this.totalCessAmountb2cl
        }
      },
      {
        sheetName: 'B2CLA',
        jsonData: mapB2CLADetails(formatDetails(this.b2claDetails, ['Original_Invoice_Date', 'Revised_Invoice_Date'])),
        summary: {
          numberOfInvoices: this.numberOfInvoicesB2CLA,
          totalInvoiceValue: this.totalInvoiceValueB2CLA,
          totalTaxableValue: this.totalTaxableValueB2CLA,
          totalCessAmount: this.totalCessAmountB2CLA
        }
      },
      {
        sheetName: 'B2CS',
        jsonData: mapB2CSDetails(formatDetails(this.b2csDetails)),
        summary: {
          totalTaxableValue: this.totalTaxableValueB2CS,
          totalCessAmount: this.totalCessAmountB2CS
        }
      },
      {
        sheetName: 'B2CSA',
        jsonData: mapB2CSAData(formatDetails(this.b2csaDetails)),
        summary: {
          totalTaxableValue: this.totalTaxableValueB2CSA,
          totalCessAmount: this.totalCessAmountB2CSA
        }
      },
      {
        sheetName: 'CDNR',
        jsonData: mapCDNRData(formatDetails(this.cdnrDetails, ['Note_Date'])),
        summary: {
          uniqueGSTINs: this.uniqueGSTINsCDNR,
          numberOfInvoices: this.numberOfInvoicesCDNR,
          totalNoteValue: this.totalNoteValueCDNR,
          totalTaxableValue: this.totalTaxableValueCDNR,
          totalCessAmount: this.totalCessAmountCDNR
        }
      },
      {
        sheetName: 'CDNRA',
        jsonData: mapCDNRAData(formatDetails(this.cdnraDetails, ['Original_Note_Date', 'Revised_Note_Date'])),
        summary: {
          uniqueGSTINs: this.uniqueGSTINsCDNRA,
          numberOfOriginalNotes: this.numberOfOriginalNotesCDNRA,
          totalNoteValue: this.totalNoteValueCDNRA,
          totalTaxableValue: this.totalTaxableValueCDNRA,
          totalCessAmount: this.totalCessAmountCDNRA
        }
      },
      {
        sheetName: 'CDNUR',
        jsonData: mapCDNURData(formatDetails(this.cdnurDetails, ['Note_Date'])),
        summary: {
          numberOfOriginalNotes: this.noOfOriginalNoteNumber,
          totalNoteValue: this.totalNoteValue,
          totalTaxableValue: this.totalTaxableValue,
          totalCessAmount: this.totalCessAmount
        }
      },
      {
        sheetName: 'CDNURA',
        jsonData: mapCDNURAData(formatDetails(this.cdnuraDetails, ['Original_Note_Date', 'Revised_Note_Date'])),
        summary: {
          numberOfOriginalNotes: this.noOfOriginalNoteNumberCDNURA,
          totalTaxableValue: this.totalTaxableValueCDNURA,
          totalCessAmount: this.totalCessAmountCDNURA
        }
      },
      {
        sheetName: 'EXP',
        jsonData: mapExpData(formatDetails(this.expDetails, ['Invoice_Date', 'Shipping_Bill_Date'])),
        summary: {
          numberOfInvoices: this.noOfInvoicesEXP,
          totalInvoiceValue: this.totalInvoiceValueEXP,
          numberOfShippingBills: this.noOfShippingBillsEXP,
          totalTaxableValue: this.totalTaxableValueEXP,
          totalCessAmount: this.totalCessAmountEXP
        }
      },
      {
        sheetName: 'EXPA',
        jsonData: mapExpaData(formatDetails(this.expaDetails, ['Original_Invoice_Date', 'Revised_Invoice_Date', 'Shipping_Bill_Date'])),
        summary: {
          totalTaxableValue: this.totalTaxableValueEXPA,
          totalCessAmount: this.totalCessAmountEXPA
        }
      },
      {
        sheetName: 'AR',
        jsonData: mapArData(this.arDetails),
        summary: {
          totalAdvanceReceived: this.totalAdvanceReceivedAR,
          totalCessAmount: this.totalCessAmountAR
        }
      },
      {
        sheetName: 'ATA',
        jsonData: mapAtaData(this.ataDetails),
        summary: {
          totalAdvanceReceived: this.totalAdvanceReceivedATA,
          totalCessAmount: this.totalCessAmountATA
        }
      },
      {
        sheetName: 'ATADJ',
        jsonData: mapAtadjData(this.atadjDetails),
        summary: {
          totalAdvanceAdjusted: this.totalAdvanceAdjustedATADJ,
          totalCessAmount: this.totalCessAmountATADJ
        }
      },
      {
        sheetName: 'ATADJA',
        jsonData: mapAtadjaData(this.atadjaDetails),
        summary: {
          totalAdvanceAdjusted: this.totalAdvanceAdjustedATADJA,
          totalCessAmount: this.totalCessAmountATADJA
        }
      },
      {
        sheetName: 'HSN',
        jsonData: mapHsnData(this.hsnDetails),
        summary: {
          numberOfHSN: this.numberOfHSN,
          totalValueHSN: this.totalValueHSN,
          totalTaxableValueHSN: this.totalTaxableValueHSN,
          totalIntegratedTaxHSN: this.totalIntegratedTaxHSN,
          totalCentralTaxHSN: this.totalCentralTaxHSN,
          totalStateUTTaxHSN: this.totalStateUTTaxHSN,
          totalCessAmountHSN: this.totalCessAmountHSN
        }
      },
      {
        sheetName: 'DOCS',
        jsonData: mapDocsData(this.docsDetails),
        summary: {
          totalNumberOfDOCS: this.totalNumberOfDOCS,
          totalCancelledDOCS: this.totalCancelledDOCS
        }
      },
    ];

    this.excelService.exportAsExcelFile(sheetData, 'GSTR1_WorkBook');
    this.downloadCount++;

    const user = "Admin";
    const currentTime = new Date().toISOString();
    const fileName = 'GSTR1_WorkBook.xlsx';
    const fileType = 'Excel'; 

    const existingRecordIndex = this.downloadHistory.findIndex(record => record.user === user);

    if (existingRecordIndex !== -1) {
      this.downloadHistory[existingRecordIndex].time = currentTime;
      this.downloadHistory[existingRecordIndex].fileName = fileName;
      this.downloadHistory[existingRecordIndex].fileType = fileType;
    } else {
      const downloadRecord = {
        user: user,
        time: currentTime,
        
        fileName: fileName,   
        fileType: fileType    
      };

      this.downloadHistory.push(downloadRecord);
    }

    const updatedRecord = this.downloadHistory.find(record => record.user === user);
    this.gstFileService.postDownloadHistory(updatedRecord).subscribe(
      response => {
        console.log('Download history recorded:', response);
      },
      error => {
        console.error('Error recording download history:', error);
      }
    );

    console.log(this.downloadHistory);



  }
}
