<!-- omit in toc -->
# Retoure App

<!-- omit in toc -->
## Description
Retoure app to pick up and return packages

<!-- omit in toc -->
## Table of Contents
<!-- toc here -->
- [1. Database](#1-database)
- [2. NPM Setup](#2-npm-setup)
- [3. Development](#3-development)
- [4. Prerequisites](#4-prerequisites)


## 1. Database

We create our database to store transportation data. Run the following command in the PgSQL Query Tool to create all the necessary tables for the project:

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

## 2. NPM Setup

Run the following command to install the dependencies and get started:

```shell
npm i express sequelize dotenv express-handlebars;
npm i --save-dev nodemon; 
npm i --save pg pg-hstore
```

Update the `scripts` in the `package.json`, s.t.:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "dev": "nodemon app.js"
}
```

## 3. Development

We perform the following steps:

- Create `.gitignore` file in [gitignore.io](https://www.toptal.com/developers/gitignore) with the following parameters: `dotenv,macos,node` and set up `.env` file. 
- Set up server and start it (in localport:5000). Test the server.
- Set up Sequelize. We store the connection to the database in `./config/database.js` and export the variable `db` to out `app.js`. Test the connection to the database.

## 4. Prerequisites

We make the following prerequisites:

- No app authentication: we forgo app authentication in the interest of time.
