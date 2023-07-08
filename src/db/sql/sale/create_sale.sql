CREATE OR REPLACE FUNCTION fn_create_sale(
				p_total_sale int4, 
				p_total_products int4, 
				p_user_id int4
			)
RETURNS integer
LANGUAGE plpgsql
AS $function$
declare 
v_last_id int4;
begin

	
	insert into sales(total_sale, total_products, date_sale, user_id)
	values(p_total_sale, p_total_products, now(), p_user_id);

	v_last_id:= lastval();

	return v_last_id;
	
    EXCEPTION
	WHEN OTHERS THEN 
        RAISE;
END;
$function$
;