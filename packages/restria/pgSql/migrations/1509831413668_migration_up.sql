-- Up schema here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Person Type
create table person
(
    id uuid default uuid_generate_v4() UNIQUE not null PRIMARY key,
    name text not null,
    nick text,
    email text not null,
    password text not null,
    active boolean not null,
    email_verified boolean not null,
    created_at timestamptz default current_timestamp,
    updated_at timestamptz default current_timestamp
);
