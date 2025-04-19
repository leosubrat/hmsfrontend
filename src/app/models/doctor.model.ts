export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }
  export interface DoctorDto {
    doctorId: number;
    firstName: string;
    middleName: string | null;
    lastName: string;
    experience: number;
    expertise:string,
    description:string|null;
    photo: string; 
    licenseNumber:string;
  }
  export interface DoctorAvailability {
    id: number;
    doctorId: number;
    date: string;
    startTime: string;
    endTime: string;
  }
  
  // Update UserDto model to include doctorAvailabilities
  
  export interface UserDto {
    userId?: number | null;
    firstName: string;
    middleName?: string | null;
    lastName: string;
    email: string;
    phone: string;
    doctorAvailabilities: DoctorAvailability[];
  }