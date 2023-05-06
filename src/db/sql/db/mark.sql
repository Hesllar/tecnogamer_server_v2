-- Table: public.marks

-- DROP TABLE IF EXISTS public.marks;

CREATE TABLE IF NOT EXISTS public.marks
(
    mark_id integer NOT NULL DEFAULT 'nextval('marks_mark_id_seq'::regclass)',
    name_mark character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT marks_pkey PRIMARY KEY (mark_id),
    CONSTRAINT name_mark UNIQUE (name_mark)
        INCLUDE(name_mark)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.marks
    OWNER to postgres;