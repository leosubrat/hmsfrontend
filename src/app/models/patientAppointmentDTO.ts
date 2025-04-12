export interface PatientAppointmentDTO {
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    appointmentDate: string;
    appointmentTime: string;
    reasonForVisit: string;
    insurance: string;
    isNewPatient: boolean;
    doctorId: number;
    doctorName: string;
    doctorSpecialty: string;
    doctorLiscenceNo:string;

  }