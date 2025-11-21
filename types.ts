export interface EmployeeData {
  fullName: string;
  email: string;
  contactNumber: string;
  gender: string;
  skills: string[];
  department: string;
  joiningDate: string;
  hobbies: string[];
  address: string;
  profilePhoto: File | null;
  profilePhotoUrl?: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  contactNumber?: string;
  gender?: string;
  skills?: string;
  department?: string;
  joiningDate?: string;
  hobbies?: string;
  address?: string;
  profilePhoto?: string;
}

export enum Department {
  IT = 'IT & Engineering',
  HR = 'Human Resources',
  SALES = 'Sales & Marketing',
  FINANCE = 'Finance & Accounts',
  OPERATIONS = 'Operations'
}

export const SKILL_OPTIONS = ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL', 'React', 'Python', 'Java'];
export const HOBBY_OPTIONS = ['Reading', 'Traveling', 'Gaming', 'Coding', 'Music', 'Sports'];
