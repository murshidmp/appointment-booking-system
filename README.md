
# Appointment Booking System

This project is a full-stack Appointment Booking System that allows users to view available time slots and book appointments. The system consists of a NestJS backend (using PostgreSQL) and a reusable HTML/CSS/JS frontend plugin.

## Functionalities

- **Fixed Time Slots Generation:**  
  The backend generates fixed 30-minute time slots from 10:00 AM to 5:00 PM (excluding the break between 1:00 PM and 2:00 PM) for every day.

- **Available Slot Filtering:**  
  For a given date, the system filters out the time slots that have already been booked, displaying only the available ones.

- **Appointment Booking:**  
  Users can book an appointment by providing their name, phone number, date, and a selected time slot. The system validates that the chosen time slot is within operating hours and not already booked.

- **Reusable Frontend Plugin:**  
  The booking UI is packaged as a JavaScript plugin that can be embedded into any website via a `<script>` tag.

- **Backend Implementation:**  
  The backend is built using NestJS and TypeORM with PostgreSQL as the database. It provides REST API endpoints to fetch available slots and book appointments.

- **Containerization with Docker:**  
  Both the backend and frontend have Dockerfiles, and a Docker Compose file is provided to easily run the entire application locally.

## Running Locally with Docker Compose

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) installed.

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/murshidmp/appointment-booking-system.git
   cd appointment-booking-system
   ```

2. **Update Environment Variables (if needed):**  
   Ensure that your PostgreSQL connection details in your Docker Compose file or your NestJS configuration are set correctly. The default settings in the provided Docker Compose file are:

   - **POSTGRES_USER:** `postgres`
   - **POSTGRES_PASSWORD:** `password`
   - **POSTGRES_DB:** `appointments`

3. **Build and Run Containers:**

   Run the following command in the project root:

   ```bash
   docker compose up -d --build
   ```

   This command builds the backend and frontend images, starts a PostgreSQL container, and runs all services in detached mode.

4. **Access the Application:**

   - **Frontend:** Open your browser and navigate to `http://localhost` to see the booking widget.
   - **Backend API:** The API is available at `http://localhost:3000`.

5. **Stopping the Application:**

   When you’re done, you can stop the containers with:

   ```bash
   docker compose down
   ```

## Project Structure

```
appointment-booking-system/
├── backend/              # NestJS backend with PostgreSQL integration
│   ├── src/
│   ├── package.json
│   ├── Dockerfile        # Dockerfile for building the backend
│   └── ...               # Other backend configuration files
├── frontend/             # Reusable HTML/CSS/JS plugin for appointment booking
│   ├── index.html        # Demo page for the plugin
│   ├── style.css         # Styles for the booking widget
│   ├── plugin.js         # Embeddable booking widget code
│   └── Dockerfile        # Dockerfile for serving static files via Nginx (optional)
├── docker-compose.yml    # Docker Compose file to run all services locally
└── README.md             # This file
```

## Additional Notes

- **Error Handling:**  
  The backend validates the time slot selection and prevents double-booking. If an invalid or already booked slot is selected, it responds with a clear error message.

- **Extensibility:**  
  The frontend plugin is designed to be reusable. It can be embedded in any webpage by including the plugin JavaScript file using a `<script>` tag.

- **Further Improvements:**  
  - Implement user authentication if needed.
  - Enhance the frontend UI/UX for a better user experience.
  - Host the entire app
 
**Video Explanation:**

   - **Link:** `https://drive.google.com/file/d/1dkQsu9ih-u6LA0ocRytj0GnPjs2x2Vlv/view?usp=sharing`
