CREATE OR REPLACE FUNCTION fn_get_categories()
    RETURNS TABLE(category_id integer,name_category character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
    BEGIN
		
        RETURN QUERY
          SELECT * FROM categories;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$BODY$;