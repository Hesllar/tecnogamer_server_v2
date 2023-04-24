CREATE OR REPLACE FUNCTION fn_register_sale(
	p_total_sale integer,
	p_user_id integer
)
RETURNS TABLE(sale_id integer) 
LANGUAGE 'plpgsql'
COST 100
VOLATILE PARALLEL UNSAFE
ROWS 1000

AS $BODY$
DECLARE
v_last_id integer;
BEGIN
	
	if(not exists(select * from users u where u.user_id = p_user_id))then
		raise 'Este usuario, no está registrado';
	end if;
	
	INSERT INTO sales (total_sale, date_sale, user_id)
	VALUES(p_total_sale, now(), p_user_id);
	
	v_last_id:= lastval();
	
	RETURN QUERY
	  SELECT v_last_id;
	EXCEPTION
	WHEN OTHERS THEN 
		RAISE;
END;
$BODY$;