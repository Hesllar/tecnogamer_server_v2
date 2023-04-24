

CREATE OR REPLACE FUNCTION fn_update_password_user(p_email text, p_password text)
RETURNS TABLE(rows_affected integer) 
LANGUAGE 'plpgsql'
COST 100
VOLATILE PARALLEL UNSAFE
ROWS 1000

AS $BODY$
DECLARE
v_row_count integer;
BEGIN
	
	if(not exists(select s.email from users s where s.email = p_email))then
		raise 'Usuario no encontrado';
	end if;
	
	update users
	set "password" = p_password
	where users.email = p_email;
	
	GET DIAGNOSTICS v_row_count = ROW_COUNT;
	
	RETURN QUERY
	  SELECT v_row_count;
	EXCEPTION
	WHEN OTHERS THEN 
		RAISE;
END;
$BODY$;