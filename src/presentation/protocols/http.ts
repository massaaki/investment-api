export interface HttpRequest<T = any> {
  headers?: any
  body?: T
}

export interface HttpResponse<T = any> {
  statusCode: number
  body: T
}