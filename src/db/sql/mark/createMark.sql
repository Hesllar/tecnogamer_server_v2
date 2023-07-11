CREATE OR REPLACE FUNCTION fn_create_mark(
	p_namemark character varying)
    RETURNS setof public.marks 
    LANGUAGE 'plpgsql'

AS $function$
declare 
v_last_id int4;
BEGIN
	
	IF(exists (select m.name_mark from marks m WHERE m.name_mark = p_namemark ))THEN
		RAISE 'Ya existe una marca con este nombre';
	END IF;
	
	INSERT INTO marks (name_mark)
	VALUES(p_nameMark);
    
	v_last_id:= lastval();

    RETURN QUERY
      SELECT * from marks m where m.mark_id = v_last_id;
    EXCEPTION
	WHEN OTHERS THEN 
        RAISE;
END;
$function$;