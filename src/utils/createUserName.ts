

export const createUserName = (userName: string, lastName: string): string => {
    return `${userName.slice(0, 2)}${lastName.split(' ')[0]}`.toLocaleLowerCase();
}
