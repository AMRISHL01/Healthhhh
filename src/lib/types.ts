export type Vital = {
  date: string;
  heartRate: number;
  spo2: number;
  temperature: number;
  bloodPressure: string;
};

export type Patient = {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  vitals: Vital[];
  alertStatus: 'normal' | 'warning' | 'critical';
};

export type NurseTask = {
  id: string;
  patientId: string;
  patientName: string;
  task: string;
  time: string;
  status: 'pending' | 'completed';
  notes?: string;
};
