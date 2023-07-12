CREATE OR REPLACE FUNCTION fn_create_product(
	p_name_product character varying,
	p_stock integer,
	p_price integer,
	p_description  character varying,
	p_image character varying,
	p_mark_id integer,
	p_category_id integer
)

RETURNS setof public.products 
LANGUAGE 'plpgsql'
COST 100
VOLATILE PARALLEL UNSAFE
ROWS 1000

AS $function$
DECLARE
v_last_id integer;
BEGIN
	
	if(exists(select * from products p where p.name_product = p_name_product))then
		raise 'Este producto, ya está registrado';
	elsif(not exists(select * from categories c where c.category_id = p_category_id))then
		raise 'La categoría, no está registrada';
	elsif(not exists(select * from marks m where m.mark_id = p_mark_id))then
		raise 'La marca, no está registrada';
	end if;
	
	INSERT INTO products (name_product, stock, price, description, image, mark_id, category_id)
	VALUES(p_name_product, p_stock, p_price, p_description, p_image, p_mark_id, p_category_id);
	
	v_last_id:= lastval();
	
	RETURN QUERY
	  SELECT * from products p where p.product_id = v_last_id;
	EXCEPTION
	WHEN OTHERS THEN 
		RAISE;
END;
$function$;