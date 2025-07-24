import { TErrorsource } from "../interfaces/error.types";

export const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorCode => {
  const errorSocurse: TErrorsource[] = [];

  const errors = Object.values(err.errors)

  errors.forEach((errorObject: any) => errorSocurse.push({
    path: errorObject.path,
    message: errorObject.message
  }))


  return {
    statusCode: 400,
    message: 'validation error',
    errorSocurse
  }


}