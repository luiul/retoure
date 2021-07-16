<!-- omit in toc -->
# 🚚 Retoure App

Retoure app to pick up and return packages. Updated version can be found in GitHub: [🚚 Retouren App with Sequelize Migration](https://github.com/luiul/retoure-mig).

<!-- omit in toc -->
# Table of Contents
<!-- toc here -->
- [1. Database](#1-database)
  - [1.1. Create Database](#11-create-database)
  - [1.2. Populate Database](#12-populate-database)
- [2. NPM Setup](#2-npm-setup)
- [3. Development](#3-development)
- [4. Prerequisites](#4-prerequisites)

# 1. Database

We create a single table to store our data to simply our model (see assumptions). Basic postgres navigation commads:

- `\l` to list all databases in postgres
- `\c` to move inside a database
- `\dt` to show table in database

## 1.1. Create Database

We create only one table for this project and store the necessary data with redundancies (this simplifies the model in our app).

```sql
create database retoure create table transports(
  -- default primery key for Sequelize
  id serial primary key,
  -- transportation data
  transport_status varchar(50) not null default 0,
  paket_id int unique not null,
  paket_bez varchar(50) not null default 'unbekannt',
  fach_bez varchar(50) not null default 'unbekannt',
  zbs_bez varchar(50) not null default 'unbekannt',
  -- tour data
  tour_bez varchar(50) not null default 'unbekannt',
  tour text [] default ARRAY[0],
  -- recipient and sender data
  emp_name varchar(50) not null default 'unbekannt',
  emp_plz varchar(5) not null default '00000',
  abd_name varchar(50) not null default 'unbekannt',
  abd_plz varchar(5) not null default '00000',
  -- transport parameters
  abholversuch int default 0,
  alter int default 0,
  -- Sequelize is case sensitive, make sure the columns are named correctly!
  -- Sequelize records these automatically
  "createdAt" timestamp not null,
  "updatedAt" timestamp
)
```

## 1.2. Populate Database

```sql
insert into
  transports(
    transport_status,
    paket_id,
    paket_bez,
    fach_bez,
    zbs_bez,
    tour_bez,
    tour,
    emp_name,
    emp_plz,
    abd_name,
    abd_plz,
    abholversuch,
    alter,
    "createdAt",
    "updatedAt"
  )
values
(
    0,
    1,
    'Laptop',
    'Fach 1',
    'ZBS 1',
    'NRW 1',
    '{"00000", "00001", "00002", "00003", "00000"}',
    'Alice',
    '00001',
    'Bob',
    '00001',
    0,
    0,
    now(),
    now()
  )
```

# 2. NPM Setup

Run the following command to install the dependencies and get started (see assumptions).

```shell
npm i express sequelize dotenv;
npm i --D nodemon @handlebars/allow-prototype-access express-handlebars handlebars;
npm i --save pg pg-hstore
```

Update the `scripts` in the `package.json`.

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "dev": "nodemon app.js"
}
```

Run from terminal with command  `npm run dev`.

# 3. Development

We perform the following steps:

- Create `.gitignore` file in [gitignore.io](https://www.toptal.com/developers/gitignore) with the following parameters: `dotenv,macos,node` and set up `.env` file.
- Set up server and start it (in localport:5000). Test the server.
- Set up Sequelize. We store the connection to the database in `./config/database.js` and export the variable `db` to out `app.js`. Test the connection to the database.
- Create a model for the resources. To simplify the project we create a single model for the transport objects.
- Create the routes for the project and test them.
- Add the middleware to finish the interface of the app. Add `handlebars`, `css` files in views and public files respectively.

# 4. Prerequisites

We make the following prerequisites:

- No app authentication: we forgo app authentication in the interest of time.
- We store all data in one table to simplify the model. Setting up a database with multiple tables requires configuration of Sequelize and models for the project. The single table we use for the app can be interpreted as a (PgSQL) view.
- Add runtime option to disable check "own property" of its parent (see [here](https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access) and [here](https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access)). This creates vulnerabilities in the app.
