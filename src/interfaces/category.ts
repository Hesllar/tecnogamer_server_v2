export interface Category {
    name_category: string
    category_id?: number,
}
export type OutPutGetCategories = Pick<Category, 'category_id' | 'name_category'>
export type OutPutGetCategoryById = Pick<Category, 'category_id' | 'name_category'>
export type OutPutPostCategory = Pick<Category, 'name_category'>
export type PostCategory = Pick<Category, 'name_category'>
export type GetCategoryById = Pick<Category, 'category_id'>
