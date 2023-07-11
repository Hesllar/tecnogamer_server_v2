CREATE OR REPLACE FUNCTION fn_get_category_by_id(
	p_categoryid integer)
    RETURNS setof public.categories 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $function$
    BEGIN
        
        RETURN QUERY
          SELECT * FROM categories c where c.category_id = p_categoryid;
        exception 
        when others then 
            RAISE;
    END;
$function$;