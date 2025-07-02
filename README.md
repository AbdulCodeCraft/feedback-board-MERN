
# Product Feedback Board

A full-stack web application designed to allow users to submit product feedback or feature requests, upvote existing suggestions, and see the status of these suggestions (Open, Planned, In Progress, Done). Admins have the capability to update the status of feedback items.

##  Live Demo

- **Frontend:** [**Live Site**](https://feedback-board-theta.vercel.app)
- **Backend API:** [https://feedback-board-0aam.onrender.com](https://feedback-board-0aam.onrender.com)
- **GitHub Repository:** [https://github.com/AbdulCodeCraft/feedback-board-MERN](https://github.com/AbdulCodeCraft/feedback-board-MERN)


---

**Authentication Credentials:**

- **User:** `username: user`, `password: userpassword`
- **Admin:** `username: admin`, `password: adminpassword`

---

##  Features

### Core Features:

- **Submit Feedback:** Users can submit new product feedback or feature requests with a title, description, and category.
- **View Feedback:** All feedback items are listed on the homepage, showing title, description, category, status, and upvotes.
- **Upvote Suggestions:** Users can upvote existing suggestions directly from the homepage.
- **Feedback Details:** A dedicated page to view the full content of a feedback item.
- **Comments Section:** Users can view existing comments and add new comments to any feedback item.
- **Search Functionality:** Filter feedback items on the homepage by keywords in their title or description.
- **Filter & Sort Options:** Filter feedbacks by status or category, and sort them by upvotes or creation date (newest/oldest).

### Bonus Features Implemented:

- **Basic Authentication (Mock):** A mock authentication system with predefined `user` and `admin` credentials, using `localStorage` for session management.
  - **User Flow:** Users must log in to access the feedback board and submit new feedback.
  - **Admin Access:** Users logged in as 'admin' gain additional privileges (specifically, the ability to change feedback status).
- **Admin Status Change:** Admins can change the status (Open, Planned, In Progress, Done) of any feedback item directly from its detail page using a dropdown.
- **Mobile Responsiveness:** The entire application, including the navbar with a hamburger menu, login page, and filter/sort controls, is designed to be responsive across various screen sizes.

---

##  Tech Stack

### Frontend:
- **React.js**
- **Vite**
- **Tailwind CSS**
- **Axios**
- **React Router DOM**

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **dotenv**
- **CORS**

---

##  Setup Instructions

Follow these steps to get the project up and running on your local machine.

### Prerequisites:

- **Node.js (LTS version):** [Download here](https://nodejs.org/)
- **npm:** Comes with Node.js
- **MongoDB Atlas Account:** [cloud.mongodb.com](https://cloud.mongodb.com/)

---

### 1. Clone the Repository:

```bash
git clone https://github.com/AbdulCodeCraft/feedback-board-MERN.git
cd feedback-board-MERN
````

### 2. Backend Setup:

Navigate into the `backend` directory, install dependencies, and set up environment variables.

```bash
cd feedback_board/backend
npm install
```

Create a `.env` file in the `feedback_board/backend/` directory:

```dotenv
PORT=5000
MONGODB_URI=mongodb+srv://abdul7448:venzo123@productfeedbackboarddb.5n53cna.mongodb.net/feedback_db?retryWrites=true&w=majority&appName=ProductFeedbackBoardDBgid
```

Run the backend server:

```bash
node server.js
```

Your server should be live at `http://localhost:5000`.

---

### 3. Frontend Setup:

Open a **new** terminal window:

```bash
cd feedback_board/frontend
npm install
```

Create a `.env` file in the `feedback_board/frontend/` directory:

```dotenv
VITE_API_BASE_URL=http://localhost:5000
```

Run the frontend dev server:

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

### 4. Login Credentials:

* **User:** `username: user`, `password: userpassword`
* **Admin:** `username: admin`, `password: adminpassword`

---

##  API Documentation

### Base URL: `http://localhost:5000`

### Feedback Endpoints:

* **POST /feedbacks**

  * **Description:** Submits new feedback
  * **Body:**

    ```json
    {
      "title": "string",
      "description": "string",
      "category": "Feature" | "Bug" | "UI" | "Other"
    }
    ```
  * **Response:** `201 Created`

* **GET /feedbacks**

  * **Description:** Retrieves all feedbacks
  * **Query Params (optional):**

    * `q=keyword`
    * `status=Open|Planned|InProgress|Done`
    * `category=Feature|Bug|UI|Other`
    * `sortBy=upvotes|createdAt`
    * `sortOrder=asc|desc`
  * **Response:** `200 OK`

* **GET /feedbacks/\:id**

  * **Description:** Get a single feedback by ID
  * **Response:** `200 OK` or `404 Not Found`

* **PATCH /feedbacks/\:id/upvote**

  * **Description:** Increment upvote count
  * **Response:** `200 OK`

* **PATCH /feedbacks/\:id/status**

  * **Description:** Update feedback status
  * **Body:**

    ```json
    {
      "status": "Open" | "Planned" | "In Progress" | "Done"
    }
    ```
  * **Response:** `200 OK`

### Comment Endpoints:

* **POST /feedbacks/\:feedbackId/comments**

  * **Description:** Add a comment
  * **Body:**

    ```json
    {
      "content": "string"
    }
    ```
  * **Response:** `201 Created`

* **GET /feedbacks/\:feedbackId/comments**

  * **Description:** Get all comments for a feedback
  * **Response:** `200 OK`

---
