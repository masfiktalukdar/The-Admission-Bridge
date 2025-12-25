export interface University {
  id: number;
  name: string;
  country: string;
  degree_level: string;
  tuition_usd: number;
  gpa_required: number;
  ielts_required: number;
  image_url: string;
  description: string;
}

export interface Application {
  id: string;
  user_id: string;
  university_id: number;
  university_name: string;
  university_image: string;
  degree_level: string;
  full_name: string;
  email: string;
  phone: string;
  statement: string;
  user_gpa: number;
  user_ielts: number;
  status: 'pending' | 'accepted' | 'rejected';
  submitted_at: string;
}

export interface UserStats {
  gpa: number;
  ielts: number;
}

export interface FilterState {
  query: string;
  country: string;
  degree: string;
  maxTuition: number;
}
