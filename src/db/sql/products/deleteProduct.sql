CREATE OR REPLACE FUNCTION fn_delete_product(p_product_id integer)
RETURNS boolean
LANGUAGE 'plpgsql'
AS $function$
BEGIN
	if(not exists(select p2.product_id  from products p2 where p2.product_id = p_product_id))then
		raise 'El producto que intenta eliminar no existe';
	elsif(exists(select dt.product_id from detail_sales dt where product_id = p_product_id))then
		raise 'Este producto no se puede eliminar';
	end if;
	
	delete from products p where p.product_id = p_product_id;
	
	RETURN true;
	EXCEPTION
	WHEN OTHERS THEN 
		RAISE;
END;
$function$;
