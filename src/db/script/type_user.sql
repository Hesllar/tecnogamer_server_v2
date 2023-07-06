-- public.type_users definition

-- Drop table

-- DROP TABLE public.type_users;

CREATE TABLE public.type_users (
	type_user_id serial4 NOT NULL,
	name_type_user varchar(100) NOT NULL,
	CONSTRAINT name_type_user UNIQUE (name_type_user) INCLUDE (name_type_user),
	CONSTRAINT type_users_pkey PRIMARY KEY (type_user_id)
);