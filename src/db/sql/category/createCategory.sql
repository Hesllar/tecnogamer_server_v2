CREATE OR REPLACE FUNCTION fn_create_category(
	p_namecategory character varying)
    RETURNS setof public.categories 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $function$
declare 
v_last_id int4;
BEGIN
	
	IF(exists (select c.name_category from categories c WHERE c.name_category = p_namecategory ))THEN
		RAISE 'Ya existe una categoría con este nombre';
	END IF;
	
	INSERT INTO categories (name_category)
	VALUES(p_namecategory);
    
	v_last_id := lastval();

    RETURN QUERY
      SELECT * from categories c where c.category_id = v_last_id;
    EXCEPTION
	WHEN OTHERS THEN 
        RAISE;
END;
$function$;