export default interface QueryParamsTask {
    PageNumber: number | undefined
    PageSize: number | undefined
    SearchTitle: string | undefined
    Done: boolean | undefined
    CreatedAfter: Date | undefined 
    CreatedBefore: Date | undefined
}