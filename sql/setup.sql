DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS menus CASCADE;
DROP TABLE IF EXISTS sales CASCADE;

CREATE TABLE users(
    google_id TEXT NOT NULL UNIQUE,
    notifications BOOLEAN NOT NULL
);

CREATE TABLE inventory(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id TEXT REFERENCES users(google_id),
    item_name TEXT NOT NULL,
    description TEXT NOT NULL,
    total_on_hand INTEGER NOT NULL,
    par INTEGER NOT NULL,
    unit_type TEXT NOT NULL
);

CREATE TABLE menus(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    inventory_id BIGINT REFERENCES inventory(id),
    meal_name TEXT NOT NULL unique,
    ingredients TEXT [] NOT NULL

);

CREATE TABLE sales(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    menu_id BIGINT REFERENCES menus(id),
    sales TEXT []
);
