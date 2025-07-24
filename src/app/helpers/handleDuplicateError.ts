import { TGenericErrorCode } from "../interfaces/error.types";

 
export const handleDuplicateError = (err: any): TGenericErrorCode => {
  const duplicate = err.message.match(/"([^"]*)"/);

  return {
    statusCode: 400,
    message: `${duplicate[1]} Already exist`
  }
}