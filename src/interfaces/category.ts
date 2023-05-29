export interface Category {
    categoryId: number,
    nameCategory: string
}

export type PostCategory = Pick<Category, 'nameCategory'>
export type GetCategoryById = Pick<Category, 'categoryId'>
