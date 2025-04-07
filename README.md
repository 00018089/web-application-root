##  About the App

The **Book Review Web App** allows users to register, log in, and manage book reviews. Users can create, read, update, and delete (CRUD) reviews with details such as title, author, genre, and rating. The application uses MongoDB Atlas for database storage.

##  How to Run the App Locally

###  Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and a cluster
- [Git](https://git-scm.com/)

---

### Step-by-step Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/00018089/web-application-root.git
cd web-application-root

2. ** Install Dependencies **

3  ** Set Up .env File **

Create a .env file in the root directory with the following:

MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
PORT=3000

4 ** Start the App **

For development:

npx nodemon app.js

Or just:

node app.js
5  **Open in Browser**

Visit: http://localhost:3000


** Application Dependencies **

express – Web framework

mongoose – MongoDB object modeling

pug – Template engine for views

bcryptjs – Password hashing

jsonwebtoken – Token-based authentication

cookie-parser – Cookie handling

dotenv – Environment variable management

express-validator – Validation for user input

i18n – Internationalization (language support)

body-parser – Parse request bodies

nodemon – Development server with auto-restart

install all via : 

npm install express mongoose pug bcryptjs jsonwebtoken cookie-parser dotenv express-validator i18n body-parser


Project Structure
/web-application-root/
├── app.js
├── package.json
├── .env
├── /controllers
│   ├── reviewsController.js
│   └── usersController.js
├── /models
│   ├── Review.js
│   └── User.js
├── /routes
│   ├── reviews.js
│   └── users.js
├── /services
│   └── index.js
├── /views
│   ├── layout.pug
│   ├── index.pug
│   ├── login.pug
│   ├── register.pug
│   ├── review_list.pug
│   └── review_form.pug
├── /public
│   ├── /images
│   ├── /styles
│   │   └── style.css
│   └── /javascripts

Links :
GitHub Repository : https://github.com/00018089/web-application-root