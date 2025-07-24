import { TGenericErrorCode } from "../interfaces/error.types"

export const handleCastError = (err: mongoose.Error.CastError): TGenericErrorCode => {
  return {
    statusCode: 400,
    message: "Invalid mongodb object id. please provide valid id"
  }
}