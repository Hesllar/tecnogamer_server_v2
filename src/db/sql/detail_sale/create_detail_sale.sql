CREATE OR REPLACE FUNCTION fn_create_detail_sale(
						p_sale_id int4,
						p_product_id int4,
						p_quantity int4,
						p_unity_price int4,
						p_total_price int4
					)
	RETURNS int4
	LANGUAGE plpgsql
AS $function$
	begin
		
		insert into detail_sales(sale_id, product_id, quantity, unity_price, total_price)
		values(p_sale_id, p_product_id, p_quantity, p_unity_price, p_total_price);
		
		return lastval();
	
		EXCEPTION
		WHEN OTHERS THEN 
	        RAISE;
	END;
$function$