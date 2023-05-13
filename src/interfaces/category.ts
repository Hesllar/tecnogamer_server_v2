export interface Category {
    categoryId: number,
    nameCategory: string
}

export type postCategory = Pick<Category, 'nameCategory'>
export type getCategoryById = Pick<Category, 'categoryId'>
