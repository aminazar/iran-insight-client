export interface IPartnership {
  id: number;
  total: number;
  possessor_id: number;
  joiner_id: number;
  possessor_display_name: string;
  possessor_display_name_fa: string;
  joiner_display_name: string;
  joiner_display_name_fa: string;
  possessor_username: string;
  joiner_username: string;
  start_date: string;
  end_date: string;
  description: string;
  description_fa: string;
  is_confirmed: boolean;

}
