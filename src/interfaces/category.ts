export interface Category {
    name_category: string
    category_id?: number,
}

export type PostCategory = Pick<Category, 'name_category'>

