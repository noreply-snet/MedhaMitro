export interface AtmData {
  id: number;
  cardNumber: number;
  name: string;
  exp_Date: string;
  cvv: number;
}

export interface BankData {
  id: number;
  name: string;
  bank_name: string;
  branch_name: string;
  acc_type: string;
  acc_number: string;
  ifsc_code: string;
  mirc_code: string;
  note: string;
  rmn: string;
}

export interface NoteDataInt {
  name: string;
  username: string;
  para: string;
  color: string;
}

export interface PassDataInt {
  id: number;
  name: string;
  url: string;
  password: string;
  username: string;
  notes: string;
  last_seen: string;
  loginid: string;
}


export interface ColorInt {
  [key: string]: string;
}

export interface NoteColor {
  name: string;
  username: string;
  para: string;
  color: string;
}

