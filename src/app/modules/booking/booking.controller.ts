import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BookingService } from "./booking.services";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;

    const booking = await BookingService.createBooking(req.body, decodedToken.userId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Bkkoing creating successfully",
        data: booking,
    })


});
// get all user booking data 
const getUserBookings = catchAsync(async (req: Request, res: Response) => {

})

// get singleBooking data 

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {

});

// get all booking data 

const getAllBookings = catchAsync(async (req: Request, res: Response) => {

})



// update Booking status 
const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {

})


export const BookingController = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    getUserBookings,
    updateBookingStatus
}