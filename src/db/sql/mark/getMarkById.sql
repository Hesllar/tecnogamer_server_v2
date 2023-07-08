CREATE OR REPLACE FUNCTION fn_get_mark_by_id(
	p_markId integer
	)
    RETURNS TABLE(mark_id integer, name_mark character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $function$
    BEGIN
        
        RETURN QUERY
          SELECT * FROM marks m where m.mark_id  = p_markId;
        exception 
        when others then 
            RAISE;
    END;
$function$;