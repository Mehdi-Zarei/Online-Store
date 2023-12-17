## Introduction

This project is an online store built with [Node JS](https://nodejs.org/en/docs), [Express JS](https://expressjs.com/) and [MongoDB](https://docs.mongodb.com/), specializing in selling online courses. Users can search for and purchase their desired online courses. Administrators can create new courses, manage users, and respond to customer messages.

<hr>

## Project Features

> User Management:

<ul>
<li> User registration, deletion, and role modification.</li>
<li> Blocking offensive users.</li>
</ul>

> Course Management:

<ul>

<li>Create, edit, and delete courses.</li>
<li>Create, edit, and delete sessions within courses.</li>
<li>Create, edit, and delete categories.</li>
<li>Create, edit, and delete discounts.</li>
<li>Create, edit, and delete articles.</li>
<li>Remove or respond to user comments.</li>
<li>Send notifications to instructors and receive responses.</li>

</ul>

> Customer Relations Management:

<li>View and respond by email to messages sent through the customer contact form.</li>

> User Features:

<li> User registration and login.</li>
<li>Search and purchase online courses.</li>
<li>View purchased courses.</li>
<li>Create and respond to comments.</li>
<li>Subscribe to newsletters.</li>
<li>Update user information.</li>
<li>Use discount codes. </li>

<hr>

## Steps and Prerequisites to Run Project

<hr>

[Node JS](https://nodejs.org/en) must be installed

git clone via terminal : `https://github.com/Mehdi-Zarei/Online-Store.git`

cd to the cloned repository : `cd Online-Store`

Run `npm install` and all the dependencies mentioned in package.json will be installed inside node_modules folder.

> Note: You should first create a `.env` file in the root directory of the project before running the application.
> In the `.env` file you should define these variables. `PORT` | `JWT_SECRET` |`GMAIL_USERNAME` | `GMAIL_PASSWORD`

<hr>

## License

This project is licensed under the MIT License.

<hr>

## API Documentation

To test the APIs of this project, you can use the Postman application. Follow the steps below:

1-First, download and install the [postman](https://www.postman.com/) software from the link below or use its [extension](https://chromewebstore.google.com/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop).
<br> 2-Open the Postman application.
<br> 3-From the menu, navigate to File > Import.
<br> 4-Select the [Online Store.postman_collection.json](https://github.com/Mehdi-Zarei/Online-Store/blob/main/Online%20Store.postman_collection.json) file that you downloaded from this project and import it.
