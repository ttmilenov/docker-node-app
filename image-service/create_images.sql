create database image_app;

use image_app;

create table images (
	id int unsigned auto_increment primary key,
	name varchar(32) not null,
	env_path varchar(64) not null 
);

create user 'imageapp'@'localhost' identified by 'imageapp';

grant select, insert, update on image_app.images TO 'imageapp'@'localhost';

insert into images (name, env_path) values 
	('tsarigradsko', 'TSARIGRADSKO.png'),
	('okolovrastno', 'OKOLOVRASTNO.png'),
	('vapcarov', 'VAPCAROV.png'),
	('botevgradsko', 'BOTEVGRADSKO.png');


