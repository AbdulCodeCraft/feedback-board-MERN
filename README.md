````markdown
# Product Feedback Board

A full-stack web application designed to allow users to submit product feedback or feature requests, upvote existing suggestions, and see the status of these suggestions (Open, Planned, In Progress, Done). Admins have the capability to update the status of feedback items.



## Live Demo

* **Frontend:** [https://feedback-board-theta.vercel.app/]
* **Backend API:** [https://feedback-board-0aam.onrender.com]
* **GitHub Repository:** [https://github.com/AbdulCodeCraft/feedback-board-MERN]
---

**Authentication Credentials:**

* **User:** `username: user`, `password: userpassword`
* **Admin:** `username: admin`, `password: adminpassword`

---

##  Features

### Core Features:

* **Submit Feedback:** Users can submit new product feedback or feature requests with a title, description, and category.
* **View Feedback:** All feedback items are listed on the homepage, showing title, description, category, status, and upvotes.
* **Upvote Suggestions:** Users can upvote existing suggestions directly from the homepage.
* **Feedback Details:** A dedicated page to view the full content of a feedback item.
* **Comments Section:** Users can view existing comments and add new comments to any feedback item.
* **Search Functionality:** Filter feedback items on the homepage by keywords in their title or description.
* **Filter & Sort Options:** Filter feedbacks by status or category, and sort them by upvotes or creation date (newest/oldest).

### Bonus Features Implemented:

* **Basic Authentication (Mock):** A mock authentication system with predefined `user` and `admin` credentials, using `localStorage` for session management.
    * **User Flow:** Users must log in to access the feedback board and submit new feedback.
    * **Admin Access:** Users logged in as 'admin' gain additional privileges (specifically, the ability to change feedback status).
* **Admin Status Change:** Admins can change the status (Open, Planned, In Progress, Done) of any feedback item directly from its detail page using a dropdown.
* **Mobile Responsiveness:** The entire application, including the navbar with a hamburger menu, login page, and filter/sort controls, is designed to be responsive across various screen sizes.

---

## 🛠️ Tech Stack

### Frontend:
* **React.js:** A JavaScript library for building user interfaces.
* **Vite:** A fast build tool for modern web projects (used for React development).
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Axios:** A promise-based HTTP client for making API requests.
* **React Router DOM:** For declarative routing in React applications.

### Backend:
* **Node.js:** A JavaScript runtime environment.
* **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
* **MongoDB Atlas:** A cloud-hosted NoSQL database used for data storage.
* **Mongoose:** An elegant MongoDB object modeling for Node.js.
* **dotenv:** To load environment variables from a `.env` file.
* **CORS:** Middleware for enabling Cross-Origin Resource Sharing.

---

## ⚙️ Setup Instructions

Follow these steps to get the project up and running on your local machine.

### Prerequisites:

* **Node.js:** Download and install from [nodejs.org](https://nodejs.org/).
* **npm:** Comes bundled with Node.js.
* **MongoDB Atlas Account:** Create a free account at [cloud.mongodb.com](https://cloud.mongodb.com/) and set up a new cluster. Ensure you configure Network Access (allow your IP or 0.0.0.0/0 for testing) and create a Database User.

### 1. Clone the Repository:

```bash
git clone [https://github.com/AbdulCodeCraft/feedback-board-MERN.git](https://github.com/AbdulCodeCraft/feedback-board-MERN.git)
cd feedback-board-MERN
````

### 2\. Backend Setup:

Navigate into the `backend` directory, install dependencies, and set up environment variables.

```bash
cd feedback_board/backend # Important: navigate into the nested backend folder
npm install
```

Create a `.env` file in the `feedback_board/backend/` directory with your MongoDB Atlas connection string.

```dotenv
# feedback_board/backend/.env
PORT=5000
MONGODB_URI=mongodb+srv://abdul7448:venzo123@productfeedbackboarddb.5n53cna.mongodb.net/feedback_db?retryWrites=true&w=majority&appName=ProductFeedbackBoardDBgid
```


Run the backend server:

```bash
node server.js
```

The backend server should start on `http://localhost:5000`. You will see "Connected to MongoDB successfully\!" in your terminal.

### 3\. Frontend Setup:

Open a **NEW** terminal window, navigate to the `frontend` directory, install dependencies, and set up environment variables.

```bash
cd feedback_board/frontend # Important: navigate into the nested frontend folder
npm install
```

Create a `.env` file in the `feedback_board/frontend/` directory.

```dotenv
# feedback_board/frontend/.env
VITE_API_BASE_URL=http://localhost:5000
```

  * This points your frontend to your local backend server.

Run the frontend development server:

```bash
npm run dev
```

The frontend application will start (usually on `http://localhost:5173`).

### 4\. Access the Application:

Open your web browser and go to: `http://localhost:5173/` (or the URL provided by `npm run dev`).

You will be redirected to the login page.

**Mock Authentication Credentials:**

  * **User:** `username: user`, `password: userpassword`
  * **Admin:** `username: admin`, `password: adminpassword`

-----

##  API Documentation

The backend provides a RESTful API to manage feedback and comments.

### Base URL: `http://localhost:5000` (or your deployed backend URL)

### Feedback Endpoints:

  * **`POST /feedbacks`**

      * **Description:** Submits new feedback.
      * **Body:** `{ "title": "string", "description": "string", "category": "Feature" | "Bug" | "UI" | "Other" }`
      * **Response:** `201 Created` - Returns the new feedback object.

  * **`GET /feedbacks`**

      * **Description:** Retrieves all feedback items.
      * **Query Params (Optional):**
          * `q=string`: Search by title or description.
          * `status=Open|Planned|InProgress|Done`: Filter by status.
          * `category=Feature|Bug|UI|Other`: Filter by category.
          * `sortBy=upvotes|createdAt`: Sort by upvotes or creation date.
          * `sortOrder=asc|desc`: Sort order (ascending or descending).
      * **Response:** `200 OK` - Returns an array of feedback objects.

  * **`GET /feedbacks/:id`**

      * **Description:** Retrieves a single feedback item by its ID.
      * **Response:** `200 OK` - Returns the feedback object. `404 Not Found` if ID not found.

  * **`PATCH /feedbacks/:id/upvote`**

      * **Description:** Increments the upvote count for a feedback item.
      * **Response:** `200 OK` - Returns the updated feedback object.

  * **`PATCH /feedbacks/:id/status`**

      * **Description:** Updates the status of a feedback item (typically admin-only).
      * **Body:** `{ "status": "Open" | "Planned" | "In Progress" | "Done" }`
      * **Response:** `200 OK` - Returns the updated feedback object.

### Comment Endpoints:

  * **`POST /feedbacks/:feedbackId/comments`**

      * **Description:** Adds a new comment to a specific feedback item.
      * **Body:** `{ "content": "string" }`
      * **Response:** `201 Created` - Returns the new comment object.

  * **`GET /feedbacks/:feedbackId/comments`**

      * **Description:** Retrieves all comments for a specific feedback item.
      * **Response:** `200 OK` - Returns an array of comment objects.

<!-- end list -->

```
```