
export interface AtmDataCreate {
  card_number: string;
  name: string;
  exp_date: string;
  cvv: number;
}

export interface AtmDataReUp {
  id: number;
  card_number: string;
  name: string;
  exp_date: string;
  cvv: number;
}


export interface BankDataReUp {
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

export interface BankDataCreate {
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


export interface NoteDataReUp {
  id: number;
  title: string;
  tags: [string]; //string;
  para: string;
  color: string;
}

export interface NoteDataCreate {
  title: string;
  tags: [string]; //string;
  para: string;
  color: string;
}


export interface PassDataReUp {
  id: number;
  acc_name: string;
  url: string;
  loginid: string;
  password: string;
  ass_email: string;
  notes: string;
}

export interface PassDataCreate {
  acc_name: string;
  url: string;
  loginid: string;
  password: string;
  ass_email: string;
  notes: string;
}
