CREATE OR REPLACE FUNCTION fn_get_mark_by_id(
	p_markId integer
	)
    RETURNS TABLE(markid integer, namemark character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
    BEGIN
        
        RETURN QUERY
          SELECT * FROM marks m where m.mark_id  = p_markId;
        exception 
        when others then 
            RAISE;
    END;
$BODY$;