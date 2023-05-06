import { UserInterface} from '../interfaces';

export const userMappers = (userData: UserInterface) => {
    
    const { 
        firstName, 
        lastName, 
        userName,
        email, 
        typeUserId,
        userId,
        password
    } = userData;
    
    return {
        userId, 
        firstName, 
        lastName, 
        userName, 
        email: (email) && email.toLowerCase(), 
        password, 
        typeUserId
    }
}
