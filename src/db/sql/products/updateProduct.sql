CREATE OR REPLACE FUNCTION fn_update_product(p_product_id integer, 
											 p_name_product varchar,
											 p_stock integer,
											 p_price integer,
											 p_description varchar,
											 p_image varchar,
											 p_mark_id integer,
											 p_category_id integer)
    RETURNS TABLE(product_id integer) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
    BEGIN
	
		if(not exists(select p.product_id from products p where p.product_id = p_product_id))then
			raise 'Este producto, no está registrado';
		elsif(not exists(select * from categories c where c.category_id = p_category_id))then
			raise 'La categoría, no está registrada';
		elsif(not exists(select * from marks m where m.mark_id = p_mark_id))then
			raise 'La marca, no está registrada';
		end if;
		
		if(not exists(select p.product_id from products p where p.product_id =  p_product_id and p.name_product = p_name_product))then
			if(exists (select p1.product_id from products p1 where p1.name_product = p_name_product))then
				raise 'Este producto, ya está registrado';
			end if;
		end if;
		
		UPDATE products 
		SET name_product = p_name_product, 
			stock= p_stock, 
			price= p_price, 
			description = p_description,
			image = p_image,
			mark_id=p_mark_id,
			category_id=p_category_id
			WHERE products.product_id = p_product_id;
			
        RETURN QUERY
          SELECT p_product_id;
        EXCEPTION
		WHEN OTHERS THEN 
            RAISE;
    END;
$BODY$;