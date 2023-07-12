CREATE OR REPLACE FUNCTION fn_update_password_user(p_email text, p_password text)
RETURNS boolean
LANGUAGE 'plpgsql'

AS $function$
BEGIN
	
	if(not exists(select s.email from users s where s.email = p_email))then
		raise 'Usuario no encontrado';
	end if;
	
	update users
	set "password" = p_password
	where users.email = p_email;
	
	RETURN true;
	EXCEPTION
	WHEN OTHERS THEN 
		RAISE;
END;
$function$;