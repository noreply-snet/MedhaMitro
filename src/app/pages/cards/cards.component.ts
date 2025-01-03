import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { AtmData } from '../../core/interface/interfaces.share';
import { MatDialog } from '@angular/material/dialog';
import { DatashareService } from '../../shared/services/datashare.service';
import { Subscription } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AtmfromComponent } from '../../forms/atmfrom/atmfrom.component';
import { CommonModule } from '@angular/common';
import { atmDataSet } from '../../data/atmData';
import { CardPipe } from '../../shared/pipes/card.pipe';
import { MaskingPipe } from '../../shared/pipes/masking.pipe';
import { CommonImportsModule } from '../../core/modules/common-imports.module';

@Component({
  selector: 'app-cards',
  imports: [
    CommonModule,
    CommonImportsModule,
    CardPipe,
    MaskingPipe,
    MatTooltipModule,
    
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements AfterViewInit {
  dataGet: AtmData[] = atmDataSet;

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
