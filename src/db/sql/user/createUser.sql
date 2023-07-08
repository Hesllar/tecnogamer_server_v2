CREATE OR REPLACE FUNCTION fn_create_user(IN p_first_name character varying,IN p_last_name character varying,IN p_user_name character varying,IN p_email character varying,IN p_password character varying,IN p_type_user_id integer)
    RETURNS TABLE(user_id integer, email character varying, type_user integer)
    LANGUAGE 'plpgsql'
    VOLATILE
    PARALLEL UNSAFE
    COST 100    ROWS 1000 
    
AS $function$
DECLARE
v_user_name varchar;
v_random varchar;
v_user_name_random varchar;
v_last_user_id integer;
    BEGIN
		
		v_user_name := p_user_name;
		 
		IF(EXISTS(SELECT u.email FROM users as u WHERE u.email = p_email))THEN
			RAISE 'El correo electrónico, ya está registrado';
		ELSIF(EXISTS(SELECT u.user_name FROM users as u WHERE u.user_name = v_user_name  ))THEN
			SELECT random() AS random_string INTO v_random;
		 	SELECT CONCAT(v_user_name,'',split_part(v_random, '.', 2)) INTO v_user_name_random;
			v_user_name := v_user_name_random;
		END IF;
		
		INSERT INTO users (first_name, last_name, user_name, email, password, type_user_id)
		VALUES (p_first_name, p_last_name, v_user_name, p_email, p_password, p_type_user_id);
		
		v_last_user_id := lastval();
		
        RETURN QUERY
          SELECT v_last_user_id, p_email, p_type_user_id;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$function$;