CREATE OR REPLACE FUNCTION fn_update_category(
	p_categoryid integer,
	p_namecategory character varying)
    RETURNS TABLE(name_category character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $function$
    BEGIN
		if(not exists(select * from categories c where c.category_id = p_categoryid))then
			raise 'La categoría, no está registrada';
		end if;
	
		if(not exists(select * from categories c1 where c1.category_id = p_categoryid and c1.name_category = p_namecategory))then
			IF(exists(select * from categories c WHERE c.name_category = p_namecategory ))THEN
				RAISE 'El nombre de la categoría, ya está registrada';
			END IF;
		end if;
		
		
		UPDATE categories
		SET name_category = p_namecategory WHERE category_id = p_categoryid;
        
        RETURN QUERY
          SELECT p_namecategory;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$function$;
