CREATE OR REPLACE FUNCTION fn_create_category(
	p_namecategory character varying)
    RETURNS TABLE(namecategory character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
    BEGIN
		
		IF(exists (select c.name_category from categories c WHERE c.name_category = p_namecategory ))THEN
			RAISE 'Ya existe una categoría con este nombre';
		END IF;
		
		INSERT INTO categories (name_category)
		VALUES(p_namecategory);
        
        RETURN QUERY
          SELECT p_namecategory;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$BODY$;