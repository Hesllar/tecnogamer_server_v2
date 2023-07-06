-- public.detail_sales definition

-- Drop table

-- DROP TABLE public.detail_sales;

CREATE TABLE public.detail_sales (
	detail_sales_id serial4 NOT NULL,
	quantity int4 NOT NULL DEFAULT 0,
	unity_price int4 NOT NULL DEFAULT 0,
	total_price int4 NOT NULL DEFAULT 0,
	sale_id int4 NOT NULL,
	product_id serial4 NOT NULL,
	CONSTRAINT detail_sales_pkey PRIMARY KEY (detail_sales_id)
);


-- public.detail_sales foreign keys

ALTER TABLE public.detail_sales ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id);
ALTER TABLE public.detail_sales ADD CONSTRAINT sale_id FOREIGN KEY (sale_id) REFERENCES public.sales(sales_id);