-- Table: public.detail_sales

-- DROP TABLE IF EXISTS public.detail_sales;

CREATE TABLE IF NOT EXISTS public.detail_sales
(
    detail_sales_id integer NOT NULL DEFAULT 'nextval('detail_sales_detail_sales_id_seq'::regclass)',
    quantity integer NOT NULL DEFAULT 0,
    unity_price integer NOT NULL DEFAULT 0,
    total_price integer NOT NULL DEFAULT 0,
    sale_id integer NOT NULL,
    product_id integer NOT NULL DEFAULT 'nextval('detail_sales_product_id_seq'::regclass)',
    CONSTRAINT detail_sales_pkey PRIMARY KEY (detail_sales_id),
    CONSTRAINT product_id FOREIGN KEY (product_id)
        REFERENCES public.products (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT sale_id FOREIGN KEY (sale_id)
        REFERENCES public.sales (sales_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.detail_sales
    OWNER to postgres;