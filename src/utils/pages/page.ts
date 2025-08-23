export default interface Page<T> {
  pageNumber: number
  pageSize: number
  totalRecords: number
  code: number
  totalPages: number
  data: T
}