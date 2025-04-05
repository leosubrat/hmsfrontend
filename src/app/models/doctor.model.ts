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
    photo: string; // Path to the doctor's photo

  }