<!-- omit in toc -->
# Retoure App 🚚

Retoure app to pick up and return packages.

<!-- omit in toc -->
# Table of Contents
<!-- toc here -->
- [1. Database](#1-database)
- [2. NPM Setup](#2-npm-setup)
- [3. Development](#3-development)
- [4. Prerequisites](#4-prerequisites)

# 1. Database

We create only one table for this project and store the necessary data with redundancies (this simplifies the model in our app).

```sql
create table transport(
 -- transport daten
 id serial primary key, 
 transport_status varchar(50) not null, 
 paket_id int unique not null, 
 paket_bez varchar(50) not null, 
 fach_id int not null, 
 fach_bez varchar(50) not null, 
 zbs_id int not null,
 zbs_bez varchar(50) not null,
 -- tour daten
 tour_id int not null,
 tour_bez varchar(50) not null, 
 tour text[],
 -- emp und abd daten
 emp_id int not null,
 emp_name varchar(50) not null, 
 emp_plz varchar(5) not null, 
 abd_id int not null, 
 abd_name varchar(50) not null, 
 abd_plz varchar(5) not null, 
 -- steuerungsdaten
 abholversuch int,
 createdAt timestamp not null, 
 updatedAt timestamp
)
```

In case we want to avoid redundancies in out database, we can run the following command. Note the default Sequelize configuration does not work with these keys (see Sequelize documentation on [model definition](https://sequelize.org/v5/manual/models-definition.html)).  

```sql
create table zbs(
 id serial primary key, 
 kap int not null, 
 bez varchar(50) not null
)

create table tour(
 tour_id serial primary key, 
 tour text[],
 zbs_id int references zbs(id)
)

create table fach(
 fach_id serial primary key, 
 zustand int check(zustand in (0,1)) not null,
 zbs_id int references zbs(zbs_id)
)

create table paket(
 paket_id serial primary key, 
    bez varchar(50) not null,
 zustand int not null, 
 alter int not null, 
 zbs_id int references zbs(zbs_id)
)

create table ort(
 plz varchar(5) primary key, 
 bez varchar(50) not null
)

create table emp(
 emp_id serial primary key, 
 name varchar(50) not null, 
 plz varchar(5) references ort(plz),
 emp_adresse varchar(50) not null
)

create table abd(
 abd_id serial primary key, 
 name varchar(50) not null, 
 plz varchar(5) references ort(plz),
 abd_adresse varchar(50) not null
)

create table transport(
 transport_id serial primary key, 
 paket_id int references paket(paket_id),
 emp_id int references emp(emp_id),
 abd_id int references abd(abd_id),
 fach_id int references fach(fach_id),
 abholversuch int check(abholversuch > 0) not null,
 create_date timestamp not null, 
 last_update timestamp
)
```

# 2. NPM Setup

Run the following command to install the dependencies and get started.

```shell
npm i express sequelize dotenv express-handlebars;
npm i --save-dev nodemon; 
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
