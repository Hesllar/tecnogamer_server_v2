

export const lengthParams = (objectLength: number) => {
    const arr = new Array(objectLength);
    return JSON.stringify(arr.fill('?', 0, arr.length)).replace(/[^ ? ,]/g, '');
}