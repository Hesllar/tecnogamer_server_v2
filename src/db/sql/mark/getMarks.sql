CREATE OR REPLACE FUNCTION fn_get_marks(
	)
    RETURNS TABLE(mark_id integer, name_mark character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
    BEGIN
        
        RETURN QUERY
          SELECT * FROM marks;
        exception 
        when others then 
            RAISE;
    END;
$BODY$;