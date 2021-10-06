Vision

This app is designed to make inventory management easier. It uses sales reports to calculate inventory loss, which takes that pressure off of managers, This product is important because the food service industry is high stress and alleviating any pressure is a good thing.

Scope

In
The app will allow users to create an account and login using Google Oauth
The app will allow users to add an item to their inventory list
The app will allow users to search for an item in their inventory
The app will allow users to upload a CSV file
The app will allow users to opt in/out of getting daily inventory reports

Out
The app will not allow users to delete their account
The app will not allow the user to change the frequency of notifications

MVP
Our app will allow restaurants to create an inventory with the scope of ingredients and meals. They would be able to upload CSV files to update their inventory and return a report.

Stretch
-rofit reports
-notifications for expiration dates
-MACHINE LEARNING
-undo/redo change
-Inventory input form (first?)
-List ordering
-CSV upload for initial inventory
-Audit logs

Functional Requirements
A user can create an account with Google Oauth
A user can upload a CSV file
A user can add a new inventory product
A user can search for something in their inventory
A user can opt in/out of getting daily inventory reports

Non-Functional Requirements
We plan on using Google Oauth to have a secure login process.  Using Oauth, we can access the information that we need to create a user account in our own database while outsourcing all security concerns to Google. If they're not secure, I don't know how we're expected to be secure.
We will rely heavily on TDD during the entire process of building this app. There are many points where this will be useful, for instance when managing the conversion of CSV files and implementing the inventory depletion code. Using TDD, we will build our app in slices from the ground up.

Dataflow

The user reaches the home page and is prompted to login with Google Oauth. If an account already exists, the user is redirected to the dashboard. If inventory data does not already exist, a form to add a new item is displayed. Otherwise, a list of all ingredients are displayed with a search bar, each ingredient has a link to a detail page, and the user can edit the ingredient from that page. The header contains a dropdown menu with options to go to the dashboard, make a new ingredient, make a new menu item, upload a new CSV file, go to user account settings, go to the about us page, and logout.
