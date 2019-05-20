create table log(
    id serial primary key,
    platform varchar(31),
    at timestamp(0),
    email varchar(63),
    user_action varchar
);