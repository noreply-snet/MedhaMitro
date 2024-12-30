import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { AtmData } from '../../core/interface/interfaces.share';
import { MatDialog } from '@angular/material/dialog';
import { DatashareService } from '../../core/services/datashare.service';
import { Subscription } from 'rxjs';
import { CardPipe } from '../../core/pipes/card.pipe';
import { MaskingPipe } from '../../core/pipes/masking.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AtmfromComponent } from '../../forms/atmfrom/atmfrom.component';
import { CommonImportsModule } from '../../core/modules/common-imports.module';

@Component({
  selector: 'app-cards',
  imports: [
    CommonImportsModule,
    CardPipe,
    MaskingPipe,
    MatTooltipModule,
    
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements AfterViewInit {
  dataGet: AtmData[] = [
    {
      id: 1,
      cardNumber: 4892322376815462,
      name: 'Jarad Pitman',
      exp_Date: '2026-12-25 11:08:42',
      cvv: 959,
    },
    {
      id: 2,
      cardNumber: 3143042024601252,
      name: 'Krishnah Blaksley',
      exp_Date: '2030-03-03 19:57:05',
      cvv: 324,
    },
    {
      id: 3,
      cardNumber: 8577390653127213,
      name: 'Alasdair Colgan',
      exp_Date: '2029-04-16 05:32:47',
      cvv: 439,
    },
    {
      id: 4,
      cardNumber: 7265752822244448,
      name: 'Tera Kimblin',
      exp_Date: '2029-05-20 00:47:44',
      cvv: 867,
    },
    {
      id: 5,
      cardNumber: 2657737796764392,
      name: 'Donielle Gabotti',
      exp_Date: '2031-09-01 07:40:06',
      cvv: 924,
    },
    {
      id: 6,
      cardNumber: 9150143078994886,
      name: 'Agretha Pickerill',
      exp_Date: '2025-11-04 19:08:52',
      cvv: 420,
    },
    {
      id: 7,
      cardNumber: 6475381803670380,
      name: 'Aurthur Berringer',
      exp_Date: '2030-05-22 01:53:57',
      cvv: 739,
    },
    {
      id: 8,
      cardNumber: 5053435594477232,
      name: 'Fayre Cook',
      exp_Date: '2029-10-24 12:04:18',
      cvv: 796,
    },
    {
      id: 9,
      cardNumber: 7044340540880645,
      name: 'Maressa Courtliff',
      exp_Date: '2025-04-09 05:09:41',
      cvv: 949,
    },
    {
      id: 10,
      cardNumber: 9805351932577131,
      name: 'Cherrita Hathaway',
      exp_Date: '2027-11-30 04:14:45',
      cvv: 957,
    },
    {
      id: 11,
      cardNumber: 6667742658396635,
      name: 'Thorstein Wilcocke',
      exp_Date: '2029-05-13 03:35:38',
      cvv: 243,
    },
    {
      id: 12,
      cardNumber: 7157464941160525,
      name: 'Bobbie Wycliff',
      exp_Date: '2027-08-31 05:53:23',
      cvv: 281,
    },
    {
      id: 13,
      cardNumber: 7705931718329204,
      name: 'Ber Philcott',
      exp_Date: '2029-01-14 00:30:32',
      cvv: 602,
    },
    {
      id: 14,
      cardNumber: 6526891143033517,
      name: 'Lev Matussow',
      exp_Date: '2024-12-04 09:10:07',
      cvv: 720,
    },
    {
      id: 15,
      cardNumber: 2134243354455211,
      name: 'Ileana Buttrey',
      exp_Date: '2025-09-13 13:27:41',
      cvv: 282,
    },
    {
      id: 16,
      cardNumber: 3403845739858202,
      name: 'Jameson Bohlje',
      exp_Date: '2028-04-12 08:25:58',
      cvv: 478,
    },
    {
      id: 17,
      cardNumber: 9426489302792670,
      name: 'Yolanda Rowdell',
      exp_Date: '2028-03-20 16:30:51',
      cvv: 107,
    },
    {
      id: 18,
      cardNumber: 2870495697411122,
      name: 'Kissiah Bagehot',
      exp_Date: '2027-02-03 06:07:52',
      cvv: 583,
    },
    {
      id: 19,
      cardNumber: 1177140177957502,
      name: 'Millard Ratchford',
      exp_Date: '2030-03-06 10:07:50',
      cvv: 882,
    },
    {
      id: 20,
      cardNumber: 7538615851589233,
      name: 'Wake Lowdeane',
      exp_Date: '2029-01-05 23:13:09',
      cvv: 616,
    },
  ];

  @ViewChildren('frontCard', { read: ElementRef })
  frontCards!: QueryList<ElementRef>;
  @ViewChildren('backCard', { read: ElementRef })
  backCards!: QueryList<ElementRef>;
  @ViewChildren('Icons', { read: ElementRef }) matIcons!: QueryList<ElementRef>;


  
  filter: string = '';
  ddf: Subscription | undefined;

  constructor(private dialog: MatDialog, private dataShare: DatashareService) {}

  ngAfterViewInit(): void {
    // Optional: Log the DOM elements for debugging
    // console.log('Front Cards:', this.frontCards);
    // console.log('Back Cards:', this.backCards);
  }

  onEnter(num: number) {
    const frontCard = this.frontCards.toArray()[num];
    const backCard = this.backCards.toArray()[num];

    if (frontCard && backCard) {
      frontCard.nativeElement.classList.toggle('active');
      backCard.nativeElement.classList.toggle('active');
    } else {
      console.error(`Front or Back card element not found for index ${num}`);
    }
  }

  onLeave(num: number) {
    const frontCard = this.frontCards.toArray()[num];
    const backCard = this.backCards.toArray()[num];

    if (frontCard && backCard) {
      frontCard.nativeElement.classList.remove('active');
      backCard.nativeElement.classList.remove('active');
    } else {
      console.error(`Front or Back card element not found for index ${num}`);
    }
  }

  onShow(num: number) {
    const icons = this.matIcons.toArray().filter((icon) => {
      const element = icon.nativeElement as HTMLElement;
      return element.classList.contains(`mat${num}`);
    });

    if (icons.length === 0) {
      console.warn(`No icons found with class mat${num}`);
    }

    icons.forEach((icon) => {
      const element = icon.nativeElement as HTMLElement;
      element.style.opacity = '1';
    });
  }

  onHide(num: number) {
    const icons = this.matIcons.toArray().filter((icon) => {
      const element = icon.nativeElement as HTMLElement;
      return element.classList.contains(`mat${num}`);
    });

    if (icons.length === 0) {
      console.warn(`No icons found with class mat${num}`);
    }

    icons.forEach((icon) => {
      const element = icon.nativeElement as HTMLElement;
      element.style.opacity = '0';
    });
  }

  openFromDialog(): void {
    this.dialog.open(AtmfromComponent, {
      width: '50%',
      data: { type: 'Form' },
    });
  }

  openViewDialog(
    cardNo: number,
    name: string,
    expDate: string,
    cvv: number
  ): void {
    this.dialog.open(AtmfromComponent, {
      width: '45%',
      data: { type: 'View', cno: cardNo, cname: name, exp: expDate, cvv: cvv },
      disableClose : true,
    });
  }

  ngOnInit(): void {
    this.ddf = this.dataShare.data$.subscribe((data: string) => {
      this.filter = data;
    });
  }

  ngOnDestroy(): void {
    if (this.ddf) {
      this.ddf.unsubscribe();
    }
  }
}
