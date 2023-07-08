-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	user_id serial4 NOT NULL,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	user_name varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	"password" varchar(200) NOT NULL,
	type_user_id int4 NOT NULL,
	CONSTRAINT email UNIQUE (email) INCLUDE (email),
	CONSTRAINT users_pkey PRIMARY KEY (user_id)
);


-- public.users foreign keys

ALTER TABLE public.users ADD CONSTRAINT type_user_id FOREIGN KEY (type_user_id) REFERENCES public.type_users(type_user_id);