CREATE TABLE public.knex_migrations (
  id serial NOT NULL,
  "name" varchar(255) NULL,
  batch int4 NULL,
  migration_time timestamptz NULL,
  CONSTRAINT knex_migrations_pkey PRIMARY KEY (id)
);
CREATE TABLE public.knex_migrations_lock (
  "index" serial NOT NULL,
  is_locked int4 NULL,
  CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index)
);
CREATE TABLE public.ongs (
  id varchar(255) NOT NULL,
  "name" varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  whatsapp varchar(255) NOT NULL,
  city varchar(255) NOT NULL,
  uf varchar(255) NOT NULL,
  password_hash text NOT NULL DEFAULT '' :: text,
  CONSTRAINT ongs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.incidents (
  id serial NOT NULL,
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  value varchar(255) NOT NULL,
  ong_id varchar(255) NOT NULL,
  CONSTRAINT incidents_pkey PRIMARY KEY (id)
);
ALTER TABLE public.incidents
ADD
  CONSTRAINT incidents_ong_id_foreign FOREIGN KEY (ong_id) REFERENCES ongs(id);
INSERT INTO public.knex_migrations ("name", batch, migration_time)
VALUES
  (
    '20200324083454_create_ongs.js',
    1,
    '2020-04-16 17:12:50.866'
  ),(
    '20200324084129_create_incidents.js',
    1,
    '2020-04-16 17:12:50.875'
  ),(
    '20200327184036_password_ong.js',
    1,
    '2020-04-16 17:12:50.877'
  );
INSERT INTO public.ongs (
    id,
    "name",
    email,
    whatsapp,
    city,
    uf,
    password_hash
  )
VALUES
  (
    '0e26449f',
    'Hurt Cats NGO',
    'contact@hurtcats.org',
    '1122334455',
    'San Francisco',
    'CA',
    'DEMO ACCOUNT/NOT CALCULATED'
  );
INSERT INTO public.incidents(title, description, value, ong_id)
VALUES
  (
    'INCIDENTE TITLE 01',
    'DESCRIPTION TO INCIDENT 01',
    '120',
    '0e26449f'
  ),
  (
    'INCIDENTE TITLE 02',
    'DESCRIPTION TO INCIDENT 02',
    '345',
    '0e26449f'
  ),
  (
    'INCIDENTE TITLE 03',
    'DESCRIPTION TO INCIDENT 03',
    '369',
    '0e26449f'
  ),
  (
    'INCIDENTE TITLE 04',
    'DESCRIPTION TO INCIDENT 04',
    '98.8',
    '0e26449f'
  );