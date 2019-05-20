create table friendship (
  id serial primary key,
  from_id integer not null,
  to_id integer not null
);

create table message (
  id serial primary key,
  content varchar(511) not null,
  sending_time timestamp(0) not null,
  from_id integer not null,
  to_id integer not null
);

create table photo (
  id serial primary key,
  date_of_post timestamp(0),
  title varchar(31),
  is_avatar boolean not null,
  was_avatar boolean not null,
  user_id integer
);

create table post (
  id serial primary key,
  content varchar(511) not null,
  post_time timestamp(0) not null,
  author_id integer,
  owner_id integer
);

create table privacy_settings (
  id serial primary key,
  friends char(1) default 'a',
  full_info char(1) default 'a',
  messages char(1) default 'a',
  photos char(1) default 'a',
  post_authors char(1) default 'a',
  user_id integer
);

create table users (
  id serial primary key,
  bio varchar(255),
  city varchar(255),
  date_of_birth date,
  email varchar(255) not null,
  interests varchar(255),
  name varchar(255),
  password varchar(255) not null,
  sex char(1) not null,
  status varchar(255),
  surname varchar(255)
);

alter table friendship
  add constraint friendship_user_fk1
  foreign key (from_id) references users (id);

alter table friendship
  add constraint friendship_user_fk2
  foreign key (to_id) references users (id);

alter table message
  add constraint message_user_fk1
  foreign key (from_id) references users (id);

alter table message
  add constraint message_user_fk2
  foreign key (to_id) references users (id);

alter table photo
  add constraint photo_user_fk
  foreign key (user_id) references users (id);

alter table post
  add constraint post_user_fk1
  foreign key (author_id) references users (id);

alter table post
  add constraint post_user_fk2
  foreign key (owner_id) references users (id);

alter table privacy_settings
  add constraint privacy_settings_user_fk
  foreign key (user_id) references users (id);