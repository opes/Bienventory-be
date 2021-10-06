# Bienventory-fe

Inventory App: Ben Francka, DJ Drakos, Isaac Ewing, . Kubisiak

MVP description: Our app will allow restaurants to create an inventory with the scope of ingredients and meals. They would be able to upload CSV files to update their inventory and return a report. This will solve the problem of less than accurate monthly manual inventory, and allow the user to get accurate, up to date information about their restaurant inventory.

# DB ERD

## Tables

### Users
The users table exists to match the google id of the user from the front end and store it so that their inventory is unique to the user. Also stores a boolean that holds the users’ preference on receiving email notifications about their inventory.
One to one relationship with inventory.
#### Columns
google_id(PK)
notifications(BOOLEAN)



### Inventory
The inventory table exists to store the bulk item inventory information that the user will use to determine when to reorder items for their business. 
One to many relationship with menus
#### Columns
id(PK)
user_id(FK references inventory google_id)
item_name(TEXT)
purchased_from(TEXT)
total_on_hand(INTEGER)
restock_level(TEXT)


### Menus
The menus table exists to establish the amount of each bulk inventory item that is consumed in each menu item.
Menus will have to be joined with sales to match at meal_name
#### Columns
id(PK)
inventory_id(FK references inventory id)
meal_name(TEXT)
ingredients(array of bulk item percentages/fractions)


### Sales
The sales table will take the data converted from client’s CSV sales report to determine how many menu items were sold and how much of each bulk item to subtract from the inventory.
#### Columns
id(PK)
menu_id(FK references menus id)
sales(array of objects with key of meal_name references menus meal_name and value of amount_sold)



## Referenced code
Code and tutorials referenced in the making of our project.
#### Understanding how to upload files <https://www.pluralsight.com/guides/uploading-files-with-reactjs>
