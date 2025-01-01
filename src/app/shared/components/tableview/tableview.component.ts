import { Component, ElementRef, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PassDataInt } from '../../../core/interface/interfaces.share';
import { DatashareService } from '../../../core/services/datashare.service';
import { PassfromComponent } from '../../../forms/passfrom/passfrom.component';

@Component({
  selector: 'app-tableview',
  imports: [
    MatIconModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './tableview.component.html',
  styleUrl: './tableview.component.css',
})

// TODO: This component need to be fixed , now it is useless!
export class TableviewComponent {
  dataSheet = input<PassDataInt[]>([]);

// headerArray = ["SL No", "Website", "Name", "User Name", "DOB", "Last Seen", "Action"];

  rowNumber = this.dataSheet().length;
  keys: string[] = [];

// rowNumber = 1;
// keys = ["SL No", "Website", "Name", "User Name", "DOB", "Last Seen", "Action"];

  selected = '10';
  currentPage: number = 1;
  item_per_page: number = Number(this.selected);
  lastPage = this.lastpage();

// Default Sorting...
  fild: string = 'id';
  type: string = 'Num';
  order: boolean = true;

// Filter
  filter: any;
  ddf: any;

  tHeadElement: HTMLElement;

  lastpage() {
    this.item_per_page = Number(this.selected);
    let lpg = Math.trunc(this.rowNumber / this.item_per_page);
    if (this.rowNumber % this.item_per_page > 0) {
      lpg = lpg + 1;
    } else {
      lpg = lpg;
    }
    this.lastPage = lpg;
    return lpg;
  }

  constructor(
    private elem: ElementRef,
    private dataShare: DatashareService,
    private dialog: MatDialog
  ) {
    this.tHeadElement = <HTMLElement>this.elem.nativeElement;
  }

  mousein(e1: String) {
    try {
      const pp = this.tHeadElement.querySelector(
        '#' + e1 + '[area-sort="none"]'
      ) as HTMLElement;
      pp.style.cssText = 'opacity: 0.5;';
    } catch (error) {}
  }

  mouseout(e1: String) {
    try {
      const pp = this.tHeadElement.querySelector(
        '#' + e1 + '[area-sort="none"]'
      ) as HTMLElement;
      pp.style.cssText = 'opacity: 0;';
    } catch (error) {}
  }

  onClick(e1: String) {
    const pp = this.tHeadElement.querySelector('#' + e1) as HTMLElement;
    var a_ttr: String = pp.getAttribute('area-sort') || '';

    if (a_ttr === 'none') {
      // Clear the area-sort
      this.attrClear();
      //-->apply sort
      pp.setAttribute('area-sort', 'ascending');
      pp.style.cssText = 'opacity: 1';
      this.order = true;
    } else if (a_ttr === 'ascending') {
      pp.setAttribute('area-sort', 'descending');
      pp.style.cssText =
        ' transform: rotate(180deg) translateX(5px); opacity: 1; ';
      this.order = false;
    } else if (a_ttr === 'descending') {
      pp.setAttribute('area-sort', 'none');
      pp.style.cssText = 'opacity: 0; transform: rotate(0deg);';
      this.order = true;
    } else {
      console.log('---xxxx--- Fatal Error! xxx---xxx');
    }
  }

  attrClear() {
    //--> ascending clear
    try {
      const pp1 = this.tHeadElement.querySelector(
        '[area-sort="ascending"]'
      ) as HTMLElement;
      pp1.setAttribute('area-sort', 'none');
      pp1.style.cssText = 'opacity: 0;';
    } catch (error) {
      // console.log(error);
    }
    //--> descending clear
    try {
      const pp1 = this.tHeadElement.querySelector(
        '[area-sort="descending"]'
      ) as HTMLElement;
      pp1.setAttribute('area-sort', 'none');
      pp1.style.cssText = 'opacity: 0;';
    } catch (error) {
      // console.log(error);
    }
  }

  cancel(e: any) {
    console.log(e);
    const mdiv = this.tHeadElement.querySelectorAll(
      '.editbtn'
    ) as NodeListOf<HTMLElement>;
    const cbtn = this.tHeadElement.querySelectorAll(
      '.act_btn'
    ) as NodeListOf<HTMLElement>;
    const btn = this.tHeadElement.querySelector('#b' + e) as HTMLElement;
    const div = this.tHeadElement.querySelector('.edit_d' + e) as HTMLElement;
    mdiv.forEach((element) => {
      element.style.cssText = 'display: none  !important;';
    });
    cbtn.forEach((element) => {
      element.style.cssText = 'display: block  !important;';
    });
    btn.style.cssText = 'display: block !important;';
    div.style.cssText = 'display: none !important;';
  }

  openFormDialog(): void {
    const dialogRef = this.dialog.open(PassfromComponent, {
      width: '50%',
      data: { type: 'Form' },
    });
  }

  openViewDialog(
    id: string,
    nam: string,
    url: string,
    usernam: string,
    logid: string,
    pass: string,
    note: string
  ): void {
    const dialogRef = this.dialog.open(PassfromComponent, {
      width: '45%',
      data: {
        type: 'View',
        id: id,
        name: nam,
        url: url,
        username: usernam,
        loginid: logid,
        pass: pass,
        note: note,
      },
    });
  }

  ngOnInit() {
    this.ddf = this.dataShare.data$.subscribe((data) => {
      this.filter = data;
    });
    this.keys = Object.keys(this.dataSheet()[0]);
    console.log(Object.keys(this.dataSheet()[0]));
  }

  ngOnDestroy(): void {
    this.ddf.unsubscribe();
  }
}
