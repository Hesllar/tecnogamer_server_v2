-- public.categories definition

-- Drop table

-- DROP TABLE public.categories;

CREATE TABLE public.categories (
	category_id serial4 NOT NULL,
	name_category varchar(100) NOT NULL,
	CONSTRAINT categories_pkey PRIMARY KEY (category_id),
	CONSTRAINT name_category UNIQUE (name_category) INCLUDE (name_category)
);