CREATE OR REPLACE FUNCTION fn_validate_email(p_email character varying)
    RETURNS TABLE(user_id integer, email character varying, type_user integer, password character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
    BEGIN
		
		IF(NOT EXISTS(SELECT u.email FROM users u WHERE u.email = p_email))THEN
			RAISE 'El correo o contraseña no son válidos';
		END IF;
		

        RETURN QUERY
          SELECT u.user_id, u.email, u.type_user_id, u.password FROM users u where u.email = p_email;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$BODY$;