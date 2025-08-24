export interface ValidationErrors {
  [key: string]: string[]; 
}

export default interface ResponseError {
  type: string;
  title: string;
  status: number;
  errors: ValidationErrors; 
  traceId: string;
}