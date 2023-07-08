CREATE OR REPLACE FUNCTION fn_get_categories()
    RETURNS TABLE(category_id integer,name_category character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $function$
    BEGIN
		
        RETURN QUERY
          SELECT * FROM categories;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$function$;