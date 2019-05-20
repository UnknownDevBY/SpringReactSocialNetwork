create table community(
  id serial primary key,
  description varchar(127),
  title varchar(63) not null,
  admin_id int,
  foreign key (admin_id) references users(id)
);

create table community_subscribers(
  id serial primary key,
  user_id int,
  community_id int,
  foreign key (user_id) references users(id),
  foreign key (community_id) references community(id)
);

ALTER TABLE photo
ADD community_id int;

alter table photo
  add constraint photo_community_fk
  foreign key (community_id) references community (id);

ALTER TABLE post
ADD community_id int;

alter table post
  add constraint post_community_fk
  foreign key (community_id) references community (id);