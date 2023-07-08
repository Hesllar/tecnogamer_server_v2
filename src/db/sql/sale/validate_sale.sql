CREATE OR REPLACE FUNCTION fn_validate_sale(
				p_product_id int4,
				p_user_id int4
			)
RETURNS table (existsProduct bool)
LANGUAGE plpgsql
AS $function$
begin
	
	if(not exists(select u.user_id from users u where u.user_id = p_user_id) or not exists(select p.product_id  from products p where p.product_id = p_product_id))then 
		raise 'Error al generar la compra';
	elsif((select p.stock from products p where p.product_id = p_product_id) = 0)then
		raise 'Producto sin stock';
	end if;
	
	return QUERY select true;

    EXCEPTION
	WHEN OTHERS THEN 
        RAISE;
END;
$function$
;