export interface UserInterface {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    typeUserId: number
    userId?: number,
    password?: string,
}
export type updateUser = Pick<UserInterface, 'userId' | 'firstName' | 'lastName' | 'userName'>
