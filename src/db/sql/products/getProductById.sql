CREATE OR REPLACE FUNCTION fn_get_product_by_id(p_product_id integer)
    RETURNS SETOF products
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
    BEGIN
		
        RETURN QUERY
          SELECT * FROM products p where p.product_id = p_product_id;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$BODY$;