CREATE OR REPLACE FUNCTION fn_register_detail_sale(
	p_quantity integer,
	p_unit_price integer,
	p_total_price integer,
	p_sale_id integer,
	p_product_id integer
)
RETURNS TABLE(detail_sale_id integer) 
LANGUAGE 'plpgsql'
COST 100
VOLATILE PARALLEL UNSAFE
ROWS 1000

AS $BODY$
DECLARE
v_last_id integer;
BEGIN
	
	INSERT INTO detail_sales (quantity, unity_price, total_price, sale_id, product_id)
	VALUES(p_quantity, p_unit_price, p_total_price, p_sale_id, p_product_id);
	
	v_last_id:= lastval();
	
	RETURN QUERY
	  SELECT v_last_id;
	EXCEPTION
	WHEN OTHERS THEN 
		RAISE;
END;
$BODY$;