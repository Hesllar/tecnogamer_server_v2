CREATE OR REPLACE FUNCTION fn_get_users()
    RETURNS TABLE(user_id integer, 
				  first_name varchar,
				  last_name varchar,
				  user_name varchar,
				  email varchar,
				  type_user_id integer) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $function$
    BEGIN
		
        RETURN QUERY
          SELECT u.user_id, u.first_name, u.last_name, u.user_name, u.email, u.type_user_id FROM users AS u;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$function$;
