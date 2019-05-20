ALTER TABLE users
    ADD role varchar(63) default 'USER';

INSERT INTO users(email, name, surname, sex, date_of_birth, city, password, role)
VALUES ('cerambite2@gmail.com', 'Vlad', 'Efimchik', 'm', '2001-04-29', 'Minsk', '$2a$08$rEPiBsHA/Y5hmjB/iqGNReFSdzsa5PVz.SxWMNOq7t1/dhceRctG2', 'ADMIN');