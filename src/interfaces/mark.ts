export interface Mark {
    markId:number,
    nameMark: string
}
export type PostMark = Pick<Mark, 'nameMark'>
export type GetMarkById = Pick<Mark, 'markId'>
