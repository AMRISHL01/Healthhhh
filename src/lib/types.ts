export type Vital = {
  date: string;
  heartRate: number;
  spo2: number;
  temperature: number;
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
