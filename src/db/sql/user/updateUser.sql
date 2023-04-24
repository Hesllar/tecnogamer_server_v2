CREATE OR REPLACE FUNCTION fn_update_user(p_user_id integer,
										  p_first_name varchar, 
										  p_last_name varchar,
										  p_user_name varchar,
										  p_email varchar,
										  p_type_user_id integer
										 )
    RETURNS TABLE(username varchar) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
    BEGIN
	
		if(not exists(select * from users u where u.user_id = p_user_id))then
			raise 'El usuario, no está registrado';
		elsif(not exists(select * from type_users tu where tu.type_user_id = p_type_user_id))then
			raise 'El tipo de usuario, no está registrado';
		end if;
		
		if(not exists(select * from users u4 where u4.email = p_email and u4.user_id = p_user_id))then
			if(exists(select * from users u5 where u5.email = p_email))then
				raise 'El email, ya está registrado';
			end if;
		end if;
		
		if(not exists(select * from users u2 where u2.user_name = p_user_name and u2.user_id = p_user_id))then
			if(exists(select * from users u3 where u3.user_name = p_user_name))then
				raise 'El nombre de usuario, ya está registrado';
			end if;
		end if;
		
		UPDATE users
		SET 
			first_name = p_first_name, 
			last_name = p_last_name,  
			user_name = p_user_name,
			email = p_email,
			type_user_id = p_type_user_id
		WHERE user_id = p_user_id;
			

        RETURN QUERY
          SELECT p_first_name;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$BODY$;