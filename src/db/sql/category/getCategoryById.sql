
CREATE OR REPLACE FUNCTION fn_get_category_by_id(
	p_categoryid integer)
    RETURNS TABLE(category_id integer, name_category character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
    BEGIN
        
        RETURN QUERY
          SELECT * FROM categories c where c.category_id = p_categoryid;
        exception 
        when others then 
            RAISE;
    END;
$BODY$;