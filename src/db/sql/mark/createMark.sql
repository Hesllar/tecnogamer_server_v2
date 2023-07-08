CREATE OR REPLACE FUNCTION fn_create_mark(
	p_namemark character varying)
    RETURNS TABLE(name_mark character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $function$
    BEGIN
		
		IF(exists (select m.name_mark from marks m WHERE m.name_mark = p_namemark ))THEN
			RAISE 'Ya existe una marca con este nombre';
		END IF;
		
		INSERT INTO marks (name_mark)
		VALUES(p_nameMark);
        
        RETURN QUERY
          SELECT p_nameMark;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$function$;