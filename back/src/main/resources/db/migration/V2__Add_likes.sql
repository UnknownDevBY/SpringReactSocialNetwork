create table likes(
	id serial primary key,
    user_id int,
    post_id int,
    photo_id int,
    foreign key (user_id) references users(id),
	foreign key (post_id) references post(id),
    foreign key (photo_id) references photo(id)
);