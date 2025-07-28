/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Tour } from "../tour/tour.model";
import { sslService } from "../sslCommarze/SSLCommarz.serverce";
import { ISSLCommerz } from "../sslCommarze/sslCommarz";

const getTransitionId = () => {
  return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}



const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const transactionId = getTransitionId();
  const session = await Booking.startSession();

  try {
    session.startTransaction();

    const user = await User.findById(userId).session(session);
    if (!user?.phone || !user?.address) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Please update your profile");
    }

    const tour = await Tour.findById(payload.tour).select("costFrom").session(session);
    if (!tour?.costFrom) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Tour cost not found");
    }

    if (!payload.guestCount) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Guest count is required");
    }

    const amount = Number(tour.costFrom) * Number(payload.guestCount);

    const booking = await Booking.create([
      { user: userId, status: BOOKING_STATUS.PENDING, ...payload }
    ], { session });

    const payment = await Payment.create([
      {
        booking: booking[0]._id,
        status: PAYMENT_STATUS.UNPAID,
        transactionId,
        amount
      }
    ], { session });

    const updatedBooking = await Booking.findByIdAndUpdate(
      booking[0]._id,
      { payment: payment[0]._id },
      { new: true, runValidators: true, session }
    ).populate("user", "name email phone address")
      .populate("tour", "title costFrom")
      .populate("payment");

    const userAddress = (updatedBooking?.user as any).address;
    const userEmail = (updatedBooking?.user as any).email;
    const userPhone = (updatedBooking?.user as any).phone
    const userName = (updatedBooking?.user as any).name


    const sslPayload: ISSLCommerz = {
      address: userAddress,
      email: userEmail,
      phoneNumber: userPhone,
      name: userName,
      amount: amount,
      transactionId: transactionId
    }


    const sslPayment = await sslService.sslPaymentInit(sslPayload)



    await session.commitTransaction();
    return {
      payment: sslPayment,
      booking: updatedBooking
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}


// user booking get 

const getUserBookings = async () => {

}
// get book by id 
const getBookingById = async () => {

}

// update booking status 

const updateBookingStatus = async () => {

}

const getAllBookings = async () => {

}

export const BookingService = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  getAllBookings
}