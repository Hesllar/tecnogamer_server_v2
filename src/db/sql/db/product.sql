-- Table: public.products

-- DROP TABLE IF EXISTS public.products;

CREATE TABLE IF NOT EXISTS public.products
(
    product_id integer NOT NULL DEFAULT 'nextval('products_product_id_seq'::regclass)',
    name_product character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    stock integer NOT NULL DEFAULT 0,
    price integer NOT NULL DEFAULT 0,
    image text COLLATE pg_catalog."default",
    category_id integer NOT NULL,
    mark_id integer NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (product_id),
    CONSTRAINT name_product UNIQUE (name_product)
        INCLUDE(name_product),
    CONSTRAINT category_id FOREIGN KEY (category_id)
        REFERENCES public.categories (category_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT mark_id FOREIGN KEY (mark_id)
        REFERENCES public.marks (mark_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;