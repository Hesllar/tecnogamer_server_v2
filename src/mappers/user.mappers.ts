import { RegisterUser } from '../interfaces';

export const userMappers = (userData: RegisterUser) => {
    
    const { 
        first_name, 
        last_name, 
        user_name,
        email, 
        type_user,
        password
    } = userData;
    
    return {
        first_name, 
        last_name, 
        user_name, 
        email: (email) && email.toLowerCase(), 
        password, 
        type_user
    }
}
