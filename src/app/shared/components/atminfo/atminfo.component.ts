import {
  Component,
  ElementRef,
  input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DatashareService } from '../../services/shared/datashare.service';
import { AtmfromComponent } from '../../../forms/atmfrom/atmfrom.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { CardPipe } from '../../pipes/card.pipe';
import { CardNoMaskPipe, MaskingPipe } from '../../pipes/masking.pipe';
import { AtmDataReUp } from '../../../core/interface/api_int.share';

@Component({
  selector: 'app-atminfo',
  imports: [
    CommonModule,
    MatIconModule,
    CdkCopyToClipboard,
    CardNoMaskPipe,
    MaskingPipe,
    CardPipe,
  ],
  templateUrl: './atminfo.component.html',
  styleUrl: './atminfo.component.css',
})
export class AtminfoComponent implements OnInit, OnDestroy {
  getDATA = input<AtmDataReUp[]>([
    { id: 0, card_number: 'N/A', name: 'N/A', exp_date: '04/04', cvv: 404 },
  ]);

  filter: string = '';
  ddf: Subscription | undefined;

  @ViewChildren('frontCard', { read: ElementRef })
  frontCards!: QueryList<ElementRef>;
  @ViewChildren('backCard', { read: ElementRef })
  backCards!: QueryList<ElementRef>;
  @ViewChildren('Icons', { read: ElementRef }) matIcons!: QueryList<ElementRef>;

  constructor(private dialog: MatDialog, private dataShare: DatashareService) {}

  openFromDialog(): void {
    this.dialog.open(AtmfromComponent, {
      width: '50%',
      data: { type: 'Form' },
    });
  }

  openViewDialog(
    id: number,
    cardNo: string,
    name: string,
    expDate: string,
    cvv: number
  ): void {
    this.dialog.open(AtmfromComponent, {
      width: '45%',
      data: {
        type: 'View',
        card_id: id,
        cno: cardNo,
        cname: name,
        exp: expDate,
        cvv: cvv,
      },
      disableClose: true,
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
}
