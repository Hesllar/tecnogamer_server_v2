import { RegisterUser } from '../interfaces';

export const userMappers = (userData: RegisterUser) => {
    
    const { 
        firstName, 
        lastName, 
        userName,
        email, 
        typeUserId,
        password
    } = userData;
    
    return {
        firstName, 
        lastName, 
        userName, 
        email: (email) && email.toLowerCase(), 
        password, 
        typeUserId
    }
}
