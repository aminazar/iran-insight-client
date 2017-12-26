export interface ILCE {
  id: number;
  total: number;
  lce_type_id: number;
  lce_type_name: string;
  lce_type_name_fa: string;
  possessor_id: number;
  possessor_name: string;
  possessor_name_fa: string;
  joiner_id: number;
  joiner_name: string;
  joiner_name_fa: string;
  start_date: string;
  end_date: string;
  description: string;
  description_fa: string;
  is_confirmed: boolean;
  active: boolean;
}
