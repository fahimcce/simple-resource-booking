# Resource Booking System

A comprehensive full-stack resource booking application with intelligent conflict detection and buffer time management.

## Features

### ✨ Core Functionality
- **Smart Booking System**: Book shared resources with intelligent conflict detection
- **Buffer Time Management**: Automatic 10-minute buffer zones before and after bookings
- **Real-time Status Tracking**: Live status updates (Upcoming, Ongoing, Past)
- **Advanced Filtering**: Filter bookings by resource, date, and status
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 🛡️ Conflict Detection Logic
The system prevents overlapping bookings with a sophisticated buffer system:

- **10-minute buffer** before and after each booking
- If Resource A is booked 2:00 PM - 3:00 PM, the system blocks 1:50 PM - 3:10 PM
- **Example scenarios**:
  - ❌ 12:55 PM - 1:55 PM → Rejected (overlaps buffer)
  - ❌ 2:15 PM - 3:00 PM → Rejected (overlaps booking)
  - ✅ 3:15 PM - 4:00 PM → Allowed (starts after buffer)
  - ✅ 11:00 AM - 12:45 PM → Allowed (ends before buffer)

### 📋 Validation Rules
- **Minimum Duration**: 15 minutes
- **Maximum Duration**: 2 hours
- **Future Bookings Only**: Cannot book in the past
- **End Time Validation**: Must be after start time

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Node + Express
- **Database**: PostgreySQL
- **UI Components**: shadcn/ui, Radix UI primitives
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/fahimcce/simple-resource-booking
```
### 2️⃣  Install Dependencies
#### Backend (Server)
```bash
cd server
npm install
```
#### Frontend (Client)
```bash
cd client
npm install
```
### 3️⃣ Environment Variables Setup
#### 📄 Backend (liveweather-server/.env)
##### Create a .env file in server folder root directory and paste the following:
```bash
# Connect to Supabase via connection pooling
DATABASE_URL="postgresql://postgres.wlsejuocxysvnkclxxlx:rISLTTrG0o2gIrS3@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
# Direct connection to the database. Used for migrations
DIRECT_URL="postgresql://postgres.wlsejuocxysvnkclxxlx:rISLTTrG0o2gIrS3@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
NODE_ENV=development
PORT=3000
```
#### 📄 Frontend (liveweather-client/.env.local)
##### Create a .env.local file in client folder root directory and paste:
```bash
NEXT_PUBLIC_BASE_API=https://liberate-booking-server.vercel.app
```

## API Endpoints

### POST /api/bookings
Create a new booking with conflict detection.

**Request Body:**
```json
{
  "resource": "Conference Room A",
  "startTime": "2024-01-15T14:00:00.000Z",
  "endTime": "2024-01-15T15:00:00.000Z",
  "requestedBy": "John Smith"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Booking created successfully",
    "data": {
        "id": "3d8d7aac-1ef9-4b89-bbe5-241fbc4a31a7",
        "resource": "MeetingRoom-C",
        "requestedBy": "Korim khan",
        "startTime": "2025-07-25T10:00:00.000Z",
        "endTime": "2025-07-25T11:00:00.000Z",
        "createdAt": "2025-07-24T15:19:48.723Z",
        "status": "UPCOMING"
    }
}
}
```

### GET /api/bookings
Retrieve bookings with optional filtering.

**Query Parameters:**
- `resource` (optional): Filter by specific resource
- `date` (optional): Filter by specific date (YYYY-MM-DD)

**Response:**
```json
{
    "success": true,
    "message": "Bookings retrieved successfully",
    "data": [
        {
            "id": "7724ae66-e438-41ca-88ad-b38be26abc1a",
            "resource": "Conference Room A",
            "requestedBy": "hbg",
            "startTime": "2025-07-24T15:24:00.000Z",
            "endTime": "2025-07-24T15:50:00.000Z",
            "createdAt": "2025-07-24T15:33:38.574Z",
            "status": "UPCOMING"
        },
        {
            "id": "8b6b41b0-88cf-4709-a56f-2364fb642158",
            "resource": "Conference Room A",
            "requestedBy": "gjbgjfds",
            "startTime": "2025-07-24T16:00:00.000Z",
            "endTime": "2025-07-24T17:00:00.000Z",
            "createdAt": "2025-07-24T15:33:03.186Z",
            "status": "UPCOMING"
        }  
    ]
}
```

### DELETE /api/bookings/[id]
Delete a specific booking.

**Response:**
```json
{
  "success": true
}
```


### Key Components

1. **BookingForm**: Handles booking creation with real-time validation
2. **BookingDashboard**: Displays bookings with filtering and sorting
3. **Conflict Detection**: Server-side validation with buffer time logic
4. **Status Management**: Automatic status updates based on current time

## Future Enhancements

- **User Authentication**: Add user accounts and permissions
- **Calendar View**: Weekly/monthly calendar interface
- **Email Notifications**: Booking confirmations and reminders
- **Recurring Bookings**: Support for repeated bookings
- **Mobile App**: Native mobile application
- **Analytics Dashboard**: Usage statistics and insights
