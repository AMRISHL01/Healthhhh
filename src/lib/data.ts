import type { Patient, NurseTask } from '@/lib/types';

export const patients: Patient[] = [
  {
    id: 'p001',
    name: 'John Doe',
    avatar: '1',
    age: 45,
    gender: 'Male',
    alertStatus: 'critical',
    vitals: [
      { date: '2024-07-20T08:00:00Z', heartRate: 122, spo2: 88, temperature: 38.5 },
      { date: '2024-07-19T08:00:00Z', heartRate: 95, spo2: 96, temperature: 37.2 },
      { date: '2024-07-18T08:00:00Z', heartRate: 88, spo2: 97, temperature: 37.1 },
      { date: '2024-07-17T08:00:00Z', heartRate: 92, spo2: 98, temperature: 36.8 },
      { date: '2024-07-16T08:00:00Z', heartRate: 85, spo2: 99, temperature: 36.9 },
    ],
  },
  {
    id: 'p002',
    name: 'Jane Smith',
    avatar: '2',
    age: 62,
    gender: 'Female',
    alertStatus: 'warning',
    vitals: [
      { date: '2024-07-20T08:00:00Z', heartRate: 105, spo2: 93, temperature: 37.8 },
      { date: '2024-07-19T08:00:00Z', heartRate: 102, spo2: 94, temperature: 37.5 },
      { date: '2024-07-18T08:00:00Z', heartRate: 98, spo2: 95, temperature: 37.3 },
      { date: '2024-07-17T08:00:00Z', heartRate: 89, spo2: 97, temperature: 37.0 },
      { date: '2024-07-16T08:00:00Z', heartRate: 86, spo2: 98, temperature: 36.9 },
    ],
  },
  {
    id: 'p003',
    name: 'Peter Jones',
    avatar: '3',
    age: 34,
    gender: 'Male',
    alertStatus: 'critical', // Changed to critical for demo
    vitals: [
      { date: '2024-07-20T08:00:00Z', heartRate: 130, spo2: 90, temperature: 39.1 },
      { date: '2024-07-19T08:00:00Z', heartRate: 75, spo2: 98, temperature: 36.9 },
      { date: '2024-07-18T08:00:00Z', heartRate: 70, spo2: 99, temperature: 37.0 },
      { date: '2024-07-17T08:00:00Z', heartRate: 68, spo2: 99, temperature: 36.7 },
      { date: '2024-07-16T08:00:00Z', heartRate: 71, spo2: 98, temperature: 36.8 },
    ],
  },
  {
    id: 'p004',
    name: 'Mary Johnson',
    avatar: '4',
    age: 58,
    gender: 'Female',
    alertStatus: 'normal',
    vitals: [
      { date: '2024-07-20T08:00:00Z', heartRate: 80, spo2: 97, temperature: 37.0 },
      { date: '2024-07-19T08:00:00Z', heartRate: 82, spo2: 97, temperature: 37.1 },
      { date: '2024-07-18T08:00:00Z', heartRate: 79, spo2: 98, temperature: 36.9 },
      { date: '2024-07-17T08:00:00Z', heartRate: 81, spo2: 97, temperature: 37.0 },
      { date: '2024-07-16T08:00:00Z', heartRate: 83, spo2: 98, temperature: 36.8 },
    ],
  },
];

export const patientUser = patients[2]; // Use Peter Jones as the default patient user
export const doctorUser = { name: 'Dr. Evelyn Reed', avatar: '5' };
export const nurseUser = { name: 'Chris Garcia', avatar: '6' };
export const adminUser = { name: 'Alex Green', avatar: '7' };

export const nurseTasks: NurseTask[] = [
  {
    id: 't001',
    patientId: 'p001',
    patientName: 'John Doe',
    task: 'Check vitals and administer medication.',
    time: '2024-07-21T09:00:00Z',
    status: 'pending',
  },
  {
    id: 't002',
    patientId: 'p002',
    patientName: 'Jane Smith',
    task: 'Follow-up on yesterday\'s high heart rate alert.',
    time: '2024-07-21T11:00:00Z',
    status: 'pending',
  },
    {
    id: 't003',
    patientId: 'p004',
    patientName: 'Mary Johnson',
    task: 'Routine check-up.',
    time: '2024-07-21T14:00:00Z',
    status: 'completed',
    notes: 'Patient is feeling well. Vitals are stable.'
  },
];

export const allUsers = [
  ...patients.map(p => ({ id: p.id, name: p.name, role: 'Patient', status: p.alertStatus, lastLogin: '2024-07-20' })),
  { id: 'd001', name: 'Dr. Evelyn Reed', role: 'Doctor', status: 'active', lastLogin: '2024-07-21' },
  { id: 'n001', name: 'Chris Garcia', role: 'Nurse', status: 'active', lastLogin: '2024-07-21' },
];

export const systemLogs = [
  { id: 'l001', timestamp: '2024-07-21T10:05:00Z', user: 'Dr. Evelyn Reed', action: 'Logged in to the system.' },
  { id: 'l002', timestamp: '2024-07-21T10:02:00Z', user: 'AI System', action: 'Critical alert for John Doe (Heart Rate: 122 bpm). Notified Dr. Reed.' },
  { id: 'l003', timestamp: '2024-07-21T09:30:00Z', user: 'Nurse Chris Garcia', action: 'Completed task for Mary Johnson.' },
  { id: 'l004', timestamp: '2024-07-20T18:00:00Z', user: 'Patient Peter Jones', action: 'Manually logged vitals.' },
];