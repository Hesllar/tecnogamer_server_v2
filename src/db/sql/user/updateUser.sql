CREATE OR REPLACE FUNCTION fn_update_user(p_user_id integer,
										  p_first_name varchar, 
										  p_last_name varchar,
										  p_user_name varchar
										 )
    RETURNS TABLE(rows_affected integer) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $function$
DECLARE
v_row_count integer;
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
			
		GET DIAGNOSTICS v_row_count = ROW_COUNT;
        RETURN QUERY
          SELECT v_row_count;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$function$;
