# **App Name**: HealthFlow Remote

## Core Features:

- User Authentication: Secure authentication with Firebase Auth, supporting email/password and Google sign-in. Roles: Patient, Doctor, Nurse.
- Patient Vitals Upload: Patients can upload vitals (heart rate, SpO₂, temperature).
- Vitals Trend Visualization: Visualize health trends with interactive charts and graphs in the Patient Dashboard.
- AI Health Summaries: Generate AI-driven text summaries of patient health data using a generative AI tool, for quick insights.
- Doctor Patient Overview: Doctors can view a patient list with key vitals and color-coded alerts, ensuring critical information is readily available.
- AI-Generated Recommendations: Provide AI-generated care recommendations, using a generative AI tool, offering immediate support for medical staff.
- Smart Alerts: Configure smart alerts using Cloud Functions to trigger FCM push notifications when vitals cross predefined thresholds.

## Style Guidelines:

- Primary color: Calming Blue (#64B5F6) to instill trust and tranquility, appropriate for a healthcare application.
- Background color: Light blue (#E3F2FD), almost white, contributing to a clean, professional interface.
- Accent color: Muted Green (#81C784) for positive affirmations and successful health metrics.
- Body and headline font: 'PT Sans', a humanist sans-serif font for a balance of modernity and approachability.
- Use clear, modern icons from a set like Material Icons to ensure consistency and ease of understanding.
- Implement a clean, card-based layout with adequate spacing to focus user attention on critical health data and minimize clutter.
- Subtle transitions using Framer Motion to acknowledge user interactions without overwhelming the interface.