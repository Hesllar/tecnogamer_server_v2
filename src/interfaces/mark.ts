export interface Mark {
    markId:number,
    nameMark: string
}
export type postMark = Pick<Mark, 'nameMark'>
export type getMarkById = Pick<Mark, 'markId'>
