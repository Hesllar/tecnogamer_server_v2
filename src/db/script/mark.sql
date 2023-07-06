-- public.marks definition

-- Drop table

-- DROP TABLE public.marks;

CREATE TABLE public.marks (
	mark_id serial4 NOT NULL,
	name_mark varchar(100) NOT NULL,
	CONSTRAINT marks_pkey PRIMARY KEY (mark_id),
	CONSTRAINT name_mark UNIQUE (name_mark) INCLUDE (name_mark)
);