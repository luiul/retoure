create database retoure_xs create table transports(
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
  -- sequilize is case sensitive, make sure the co lumns are named correctly!
  -- sequelize records these automatically
  "createdAt" timestamp not null,
  "updatedAt" timestamp
)