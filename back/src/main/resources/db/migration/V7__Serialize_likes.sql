drop table likes;

alter table photo
  add likes varchar(65535);

alter table post
  add likes varchar(65535);