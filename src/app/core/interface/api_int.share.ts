
export interface AtmDataCreate {
  card_number: string;
  name: string;
  exp_date: string;
  cvv: number;
}

export interface AtmData {
  id: number;
  card_number: string;
  name: string;
  exp_date: string;
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


export interface NoteData {
  id: number;
  title: string;
  tags: string[]; //an array of strings;
  massage: string;
  color: string;
}

export interface NoteDataCreate {
  title: string;
  tags: string[]; //an array of strings;
  massage: string;
  color: string;
}


export interface PassData {
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
