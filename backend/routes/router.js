import express from 'express';
import { addTicket, deleteTicket, getAllTickets, getAvailableTickets, getTicketById, updateTicket } from '../controllers/ticketController.js';
import { login, logout, register } from '../controllers/authController.js';
import { addFlight, deleteFlight, getFlightById, getFlights, updateFlight } from '../controllers/flightController.js';
import { bookTicket, deleteBooking, getAllBookings, getBookingById, getBookingsPassenger, updateBooking } from '../controllers/bookingController.js';
import { addDeparture, deleteDeparture, getDepartures, getDeparturesByFlight, updateDeparture } from '../controllers/departureController.js';
import { addArrival, deleteArrival, getArrivals, getArrivalsByFlight, updateArrival } from '../controllers/arrivalController.js';
import { addAirline, deleteAirline, getAirlines, updateAirline } from '../controllers/airlineController.js';
import { addAircraft, deleteAircraft, getAircraftByAirline, getAircrafts, updateAircraft } from '../controllers/aircraftController.js';
import { addPassenger, checkPassenger } from '../controllers/PassengerContoller.js';
import authorizeRole from '../middlewares/roleMiddleware.js';
import authenticateJWT from '../middlewares/authMiddleware.js';

const router = express.Router();

// auth api
router.post('/auth/login', login);
router.post('/auth/register', register);
router.post('/auth/logout', logout);

// ticket api
router.get('/ticket/getAllTickets', getAllTickets);
router.get('/ticket/getAvailableTickets', getAvailableTickets);
router.get('/ticket/getTicketById/:id', getTicketById);
router.post('/ticket/add', authenticateJWT, authorizeRole(['Employee']), addTicket);
router.put('/ticket/update', authenticateJWT, authorizeRole(['Employee']), updateTicket);
router.delete('ticket/delete/:id', authenticateJWT, authorizeRole(['Employee']), deleteTicket);

// flight api
router.get('/flight/getFlights', getFlights);
router.get('/flight/getFlightById/:id', getFlightById);
router.post('/flight/add', authenticateJWT, authorizeRole(['Employee']), addFlight);
router.put('/flight/update', updateFlight);
router.delete('/flight/delete/:id', authenticateJWT, authorizeRole(['Employee']), deleteFlight);

// booking api
router.get('/booking/getAllBooking', getAllBookings);
router.get('/booking/getBookingById', getBookingById);
router.get('/booking/getBookingsPassenger/:accountId', getBookingsPassenger);
router.post('/booking/add', bookTicket);
router.put('/booking/update', authenticateJWT, authorizeRole(['Employee']), updateBooking);
router.delete('booking/delete/:id', authenticateJWT, authorizeRole(['Employee']), deleteBooking);

// departure api
router.get('/departure/getDepartures', getDepartures);
router.get('/departure/getDeparturesByFlight', getDeparturesByFlight);
router.post('/departure/add', authenticateJWT, authorizeRole(['Employee']), addDeparture);
router.put('/departure/update', authenticateJWT, authorizeRole(['Employee']), updateDeparture);
router.delete('/departure/delete/:id', authenticateJWT, authorizeRole(['Employee']), deleteDeparture);

// arrival api
router.get('/arrival/getArrivals', getArrivals);
router.get('/arrival/getArrivalsByFlight', getArrivalsByFlight);
router.post('/arrival/add', authenticateJWT, authorizeRole(['Employee']), addArrival);
router.put('/arrival/update', authenticateJWT, authorizeRole(['Employee']), updateArrival);
router.delete('/arrival/delete/:id', authenticateJWT, authorizeRole(['Employee']), deleteArrival);

// airline api
router.get('/airline/getAirlines', getAirlines);
router.post('/airline/add', authenticateJWT, authorizeRole(['Employee']), addAirline);
router.put('/airline/update', authenticateJWT, authorizeRole(['Employee']), updateAirline);
router.delete('/airline/delete/:id', authenticateJWT, authorizeRole(['Employee']), deleteAirline);

// aircraft api
router.get('/aircraft/getAircrafts', getAircrafts);
router.get('/aircraft/getAircraftByAirline', getAircraftByAirline);
router.post('/aircraft/add', authenticateJWT, authorizeRole(['Employee']), addAircraft);
router.put('/aircraft/update', authenticateJWT, authorizeRole(['Employee']), updateAircraft);
router.delete('/aircraft/delete/:id', authenticateJWT, authorizeRole(['Employee']), deleteAircraft);

// pasenger api
router.get('/pasenger/check/:accountId', checkPassenger);
router.post('/passenger/add', addPassenger);

export default router;