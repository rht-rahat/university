# The University Management Front-End

This project is a comprehensive web application for managing university operations efficiently and accurately. It includes features for Super Admin, Admin, Faculty, and Students, each with their own unique access and functionalities.

## Authentication System

The system's authentication is divided into four categories: Super Admin, Admin, Faculty, and Student. Each category has its own unique user ID and password.

### Super Admin

The Super Admin has access to all functionalities.

- Can create or block new Admins.
- Can create and manage Faculty members.
- Can create student admissions and manage them as needed.

### Admin

The Admin has access to all functionalities except those reserved for the Super Admin.

- Can create or block new Admins.
- Can assign all academic tasks to Faculty members.
- Can block Students.
- Can create and manage Faculty members.
- Can create student admissions and manage them as needed.
- Student IDs are auto-generated and a default password is set during account creation.

### Faculty Account

- Manage assigned subjects from Admin.
- Manage assigned subject schedules from received schedules.
- Update student exam scores.

### Student Account

- Can enroll in offered courses.
- Can view all grades and grade points.

## Account Creation

- Admin creation auto-generates an ID (e.g., A-0001) and a default password (admin123).
- Faculty creation auto-generates an ID (e.g., F-0001) and a default password (faculty123).
- Student creation auto-generates an ID (e.g., 2024020001) and a default password (student123).
- Default passwords must be changed upon the first login.

## Example Accounts

- Admin account: ID A-0001, Password 123456.
- Student account: ID 2024020003, Password 123456.
- Faculty account: ID F-0001, Password 123456.

## Special Note

Since the project is deployed on Vercel, which does not typically support Cloudinary uploads, uploading profile pictures for Student, Faculty, and Admin accounts will result in an error. However, profile picture uploads will work on a local host.

## Running the React Project on Localhost

To run the University Management System on your local machine, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/university-management.git
    ```
2. Navigate to the project directory:
    ```bash
    cd university-management
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```
5. Open your browser and navigate to:
    ```url
    http://localhost:3000
    ```


    ```js
    export default {
      // other rules...
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
    }
    ```

