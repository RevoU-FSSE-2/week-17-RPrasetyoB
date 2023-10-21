# Full-stack Project Back-end and Front-end Integration

This is a full-stack web application that allows you to perform CRUD (Create, Read, Update, Delete) operations. It is built using Express for the backend, React for the frontend, and Firebase for deployment.

## Project Overview
This project provides a web-based interface to manage a collection of items. You can perform the following CRUD operations:
- Create: Add new items to the task.
- Read: View the list of tasks.
- Update: Update status.
- Delete: Remove task from list.

## Technologies Used
- Express: A minimal and flexible Node.js web application framework for the backend.
- React: A JavaScript library for building user interfaces for the frontend.
- TypeScript: A typed superset of JavaScript that enhances code quality.
- Material-UI: A popular React UI framework for a polished user interface.
- Firebase: A cloud platform for deploying web applications.

## The Express backend provides the following API endpoints:
- POST /v1/auth/login : Login.
- POST /v1/auth/login : Register.
- POST /v1/tasks: Create a new task.
- PUT /v1/tasks/:id : Update task status. (only task maker have permission)
- DELETE /v1/tasks/:id : Delete a task. only task maker have permission)

## Light house testing :
- Mobile : <br>
![Screenshot_23](https://github.com/RevoU-FSSE-2/week-17-RPrasetyoB/assets/129088807/c39a3b61-5464-4290-9238-2b875ec34e9c)

- Desktop : <br>
![Screenshot_22](https://github.com/RevoU-FSSE-2/week-17-RPrasetyoB/assets/129088807/4185d0ec-1060-4bab-89b5-7e9583ab576e)

## Deployment (Firebase)
To deploy the application to Firebase, follow the Firebase hosting documentation and set up your Firebase project. Then, use the Firebase CLI to deploy the project.
- Front-end : >> https://week-17-renaldipb.web.app
- Back-end : >> https://us-central1-revou-fullstack.cloudfunctions.net/week17_rpb

## User for testing
```json
{
  "username" : "rpb"
  "password : "manager123"
}
```

<br>
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/B55J7eQC)
