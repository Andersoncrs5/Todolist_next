export default interface ResponseBody<T> {
    status: string
    message: string
    code: number
    data: T | undefined
    url: string | undefined
}