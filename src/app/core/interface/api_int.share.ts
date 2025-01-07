export interface AtmDataRead {
  id: number;
  card_number: string;
  name: string;
  exp_date: string;
  cvv: number;
  created_at: Date;
}

export interface AtmDataCreate {
  card_number: string;
  name: string;
  exp_date: string;
  cvv: number;
}

export interface AtmDataUpdate {
  id: number;
  card_number: string;
  name: string;
  exp_date: string;
  cvv: number;
}

export interface BankDataRead {
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
  created_at: Date;
}

export interface BankDataUpdate {
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

export interface NoteDataRead {
  id: number;
  title: string;
  tags: [string]; //string;
  para: string;
  color: string;
  created_at: Date;
}

export interface NoteDataUptade {
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

export interface PassDataRead {
  id: number;
  acc_name: string;
  url: string;
  loginid: string;
  password: string;
  ass_email: string;
  notes: string;
  created_at: Date;
}

export interface PassDataUpdate {
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
