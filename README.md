# 🚚 Retoure App

Retoure app to pick up and return packages. **Upgraded version can be found in GitHub: [🚚 Retouren App with Sequelize Migration](https://github.com/luiul/retoure-mig).**

## Database

Basic postgres navigation commads:

- `\l` to list all databases in postgres
- `\c` to move inside a database
- `\dt` to show table in database

Enter the following `create database` statement in the PostgreSQL Query Tool or console:

```sql
create database retoure create table transport(
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
  -- Sequelize is case sensitive, make sure the columns are named correctly; records these automatically
  "createdAt" timestamp not null,
  "updatedAt" timestamp
)
```

Populate table with example data:

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

## NPM Setup

Run the following command to install the dependencies and get started:

```shell
npm i express sequelize dotenv;
npm i --D nodemon @handlebars/allow-prototype-access express-handlebars handlebars;
npm i --save pg pg-hstore
```

Update the `scripts` in the `package.json` file and run app from shell with command  `npm run dev`. Default `host` is localhost and default `port` is 5000.

## Development

We perform the following tasks to start the project:

- Create `.gitignore` file in [gitignore.io](https://www.toptal.com/developers/gitignore) with the following parameters: `dotenv,macos,node,VisualStudioCode` and set up `.env` file.
- Set up server. Test server.
- Set up Sequelize. We store the connection to the database in `./config/database.js` and export the variable `db` to out `app.js`. Test connection to the database.
- Create (Sequelize) model.
- Create the routes for app. Test routes.
- Add the middleware to finish the interface of the app. Add `handlebars`, `css` files in views and public files respectively.

## Prerequisites

We make the following prerequisites:

- No authentication.
- We store all data in one table to simplify the model. Note that the model is equivalent to a PostgreSQL view (see upgraded version of the app).
- Add runtime option to disable check "own property" of its parent (see [here](https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access) and [here](https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access)). Turn this option off in production!
