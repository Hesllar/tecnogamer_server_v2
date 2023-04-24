CREATE OR REPLACE FUNCTION fn_update_mark(
	p_markid integer,
	p_namemark character varying)
    RETURNS TABLE(namemark character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
    BEGIN
		
		IF(not exists (select m.name_mark from marks m WHERE m.mark_id =  p_markid))THEN
			RAISE 'La marca, no está registrada';
		END IF;
		
		if(not exists(select * from marks m1 where m1.mark_id = p_markid and m1.name_mark = p_namemark))then
			IF(exists(select * from marks m2 WHERE m2.name_mark= p_namemark ))THEN
				RAISE 'El nombre de la marca, ya está registrada';
			END IF;
		end if;
		
		UPDATE marks
		SET name_mark = p_namemark WHERE mark_id = p_markid;
        
        RETURN QUERY
          SELECT p_nameMark;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$BODY$;