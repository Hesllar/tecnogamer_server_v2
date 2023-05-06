-- Table: public.type_users

-- DROP TABLE IF EXISTS public.type_users;

CREATE TABLE IF NOT EXISTS public.type_users
(
    type_user_id integer NOT NULL DEFAULT 'nextval('type_users_type_user_id_seq'::regclass)',
    name_type_user character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT type_users_pkey PRIMARY KEY (type_user_id),
    CONSTRAINT name_type_user UNIQUE (name_type_user)
        INCLUDE(name_type_user)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.type_users
    OWNER to postgres;