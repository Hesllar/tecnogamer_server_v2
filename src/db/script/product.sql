-- public.products definition

-- Drop table

-- DROP TABLE public.products;

CREATE TABLE public.products (
	product_id serial4 NOT NULL,
	name_product varchar(100) NOT NULL,
	description text NULL,
	stock int4 NOT NULL DEFAULT 0,
	price int4 NOT NULL DEFAULT 0,
	image text NULL,
	category_id int4 NOT NULL,
	mark_id int4 NOT NULL,
	CONSTRAINT name_product UNIQUE (name_product) INCLUDE (name_product),
	CONSTRAINT products_pkey PRIMARY KEY (product_id)
);


-- public.products foreign keys

ALTER TABLE public.products ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES public.categories(category_id);
ALTER TABLE public.products ADD CONSTRAINT mark_id FOREIGN KEY (mark_id) REFERENCES public.marks(mark_id);