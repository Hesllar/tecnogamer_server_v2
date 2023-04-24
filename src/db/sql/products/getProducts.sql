
CREATE OR REPLACE FUNCTION fn_get_products()
    RETURNS SETOF products
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
    BEGIN
		
        RETURN QUERY
          SELECT * FROM products;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$BODY$;