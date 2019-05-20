create table if not exists user_blacklist (
    user_id int not null,
    blacklist int
);

alter table if exists user_blacklist
add constraint fk_user_blacklist_users
foreign key (user_id) references users