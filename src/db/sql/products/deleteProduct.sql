CREATE OR REPLACE FUNCTION fn_delete_product(f_product_id integer)
RETURNS TABLE(rows_affected integer) 
LANGUAGE 'plpgsql'
COST 100
VOLATILE PARALLEL UNSAFE
ROWS 1000

AS $BODY$
DECLARE
v_row_count integer;
BEGIN
	
	if(exists(select dt.product_id from detail_sales dt where product_id = f_product_id))then
		raise 'Este producto nose puede eliminar';
	end if;
	
	delete from products p where p.product_id = f_product_id;

	GET DIAGNOSTICS v_row_count = ROW_COUNT;
	
	RETURN QUERY
	  SELECT v_row_count;
	EXCEPTION
	WHEN OTHERS THEN 
		RAISE;
END;
$BODY$;