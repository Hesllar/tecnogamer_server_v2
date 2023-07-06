-- public.sales definition

-- Drop table

-- DROP TABLE public.sales;

CREATE TABLE public.sales (
	sales_id serial4 NOT NULL,
	total_sale int4 NOT NULL DEFAULT 0,
	date_sale timestamptz NULL,
	user_id int4 NOT NULL,
	CONSTRAINT sales_pkey PRIMARY KEY (sales_id)
);


-- public.sales foreign keys

ALTER TABLE public.sales ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id);