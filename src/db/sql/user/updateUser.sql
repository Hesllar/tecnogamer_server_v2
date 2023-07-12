CREATE OR REPLACE FUNCTION fn_update_user(p_user_id integer,
										  p_first_name varchar, 
										  p_last_name varchar,
										  p_user_name varchar
										 )
    RETURNS boolean
    LANGUAGE 'plpgsql'

AS $function$
BEGIN

	if(not exists(select * from users u where u.user_id = p_user_id))then
		raise 'El usuario, no está registrado';
	elsif(exists(select * from users u where u.user_name = p_user_name))then
		if(not exists(select * from users u where u.user_name = p_user_name and u.user_id = p_user_id))then
			raise 'El nombre usuario, ya está registrado';
		end if;
	end if;
	
	UPDATE users
	SET 
		first_name = p_first_name, 
		last_name = p_last_name,
		user_name = p_user_name
	WHERE user_id = p_user_id;
		
    RETURN true;
    EXCEPTION
	WHEN OTHERS THEN 
        RAISE;
END;
$function$;