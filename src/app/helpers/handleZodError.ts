import { TErrorsource } from "../interfaces/error.types";

export const handleZodError = (err: any) => {

  const errorSocurse: TErrorsource[] = [];
  err.issues.forEach((issue: any) => {
    errorSocurse.push({
      path: issue.path[0],
      message: issue.message
    })
  })
  return {
    statusCode: 400,
    message: "Zod error",
    errorSocurse
  }
}

