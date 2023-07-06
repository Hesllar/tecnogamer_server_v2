export interface Mark {
    mark_id:number,
    name_mark: string
}

export type OutPutGetMarks = Pick<Mark, 'mark_id' | 'name_mark'>
export type OutPutGetMarkById = Pick<Mark, 'mark_id' | 'name_mark'>
export type OutPutPostMark = Pick<Mark, 'name_mark'>
export type OutPutPutMark = Pick<Mark, 'name_mark'>
export type PostMark = Pick<Mark, 'name_mark'>
export type GetMarkById = Pick<Mark, 'mark_id'>


