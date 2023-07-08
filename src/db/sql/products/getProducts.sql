
CREATE OR REPLACE FUNCTION fn_get_products()
    RETURNS SETOF products
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $function$
    BEGIN
		
        RETURN QUERY
          SELECT * FROM products;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$function$;