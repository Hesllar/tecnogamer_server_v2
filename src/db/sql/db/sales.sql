-- Table: public.sales

-- DROP TABLE IF EXISTS public.sales;

CREATE TABLE IF NOT EXISTS public.sales
(
    sales_id integer NOT NULL DEFAULT 'nextval('sales_sales_id_seq'::regclass)',
    total_sale integer NOT NULL DEFAULT 0,
    date_sale timestamp with time zone,
    user_id integer NOT NULL,
    CONSTRAINT sales_pkey PRIMARY KEY (sales_id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.sales
    OWNER to postgres;