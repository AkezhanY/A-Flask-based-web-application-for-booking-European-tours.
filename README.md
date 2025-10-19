Wander Europe - Tour Booking Website

Wander Europe is a Flask-based web application designed to allow users to browse and book tours across Europe. The platform provides a seamless experience for users to register, log in, explore various tours, and manage bookings.

Features

User Registration and Authentication: Users can create accounts, log in, and manage their profiles.

Tour Browsing: Discover various European tours with details like price, duration, and description.

Booking Management: Book your favorite tours, manage your bookings, and track your trip status.

Responsive Design: The website is designed to be fully responsive, ensuring it works smoothly on desktops, tablets, and mobile devices.

Installation

To run the Wander Europe web application on your local machine, follow these steps:

1. Clone the Repository

Clone the repository to your local machine using the following command:

git clone https://github.com/AkezhanY/A-Flask-based-web-application-for-booking-European-tours..git

2. Install Dependencies

Navigate to the project directory and install the required dependencies:

cd wander-europe
pip install flask

3. Run the Application

Once dependencies are installed, you can run the app using:

python app.py

4. Access the Website

Open a web browser and go to:

http://127.0.0.1:5000


You should now be able to access the application locally.

Technologies

The Wander Europe application is built using the following technologies:

Python: The backend logic is written in Python.

Flask: A lightweight web framework used to handle routes, views, and server-side logic.

HTML/CSS/JavaScript: The frontend of the site is built using HTML for structure, CSS for styling, and JavaScript for interactivity.

JSON Database: Data (e.g., user accounts, tours, bookings) is stored in JSON files for simplicity.

Folder Structure

Here’s a brief overview of the project’s directory structure:

wander-europe/
│
├── app.py            # Main Python file for the app logic
├── requirements.txt  # List of dependencies for the project
├── templates/        # HTML templates for the pages
│   ├── index.html    # Main page
│   ├── statistics.html  # Statistics page
│   ├── tours.html    # Tours page
│   ├── bookings.html # Bookings page
│   ├── seasons.html  # Seasons page
│   └── ...           # Other HTML pages
├── static/           # Static files (CSS, JS, images)
│   ├── css/          # Stylesheets
│   ├── js/           # JavaScript files
│   └── images/       # Images for the website
├── data/             # Directory for JSON database files
│   ├── tours.json    # Tour information
│   ├── users.json    # User data
│   └── bookings.json # User bookings
└── README.md   
