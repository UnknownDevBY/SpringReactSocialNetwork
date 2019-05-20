create table comment(
	id serial primary key,
	content varchar(255) not null,
	post_time timestamp(0),
	user_id int,
    photo_id int,
    post_id int,
    foreign key (user_id) references users(id),
    foreign key (photo_id) references photo(id),
    foreign key (post_id) references post(id)
);