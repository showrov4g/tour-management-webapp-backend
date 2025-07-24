export interface TErrorsource {
  path: string,
  message: string
}

export interface TGenericErrorCode {
  statusCode: string | number,
  message: string,
  errorSocurse?: TexImageSource[]
}