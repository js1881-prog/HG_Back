const tripRepository = require("./tripRepository");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const TripService = {
  async createTrip(tripData){
    const createTrips = await tripRepository.create(tripData);
    return createTrips;
  },

  async addLikeToTrip(tripId, userId) {
      const trip = await tripRepository.findTripById(tripId);
      if (!trip) {
        throw new AppError(commonErrors.resourceNotFoundError, 404, "trip not found");
      }
      if (!trip.liked_by.includes(userId)) {
        trip.likes += 1;
        trip.liked_by.push(userId);
      }
      await tripRepository.update(tripId, trip);
      return trip;
  },

  async removeLikeFromTrip(tripId, userId) {
      const trip = await tripRepository.findTripById(tripId);
      if (!trip) {
        throw new AppError(commonErrors.resourceNotFoundError, 404, "trip not found");
      }
      if (trip.liked_by.includes(userId)) {
        trip.likes -= 1;
        trip.liked_by = trip.liked_by.filter((id) => id !== userId);
      }
      await tripRepository.update(tripId, trip);
      return trip;
  },

  async getTripById(tripId){
    const getTrip = await tripRepository.findTripById(tripId);
    if (!getTrip) {
      throw new AppError(commonErrors.resourceNotFoundError, 404, "trip not found");
    }

    getTrip.views++;
    await tripRepository.updateViewsTrip(getTrip);
    return getTrip;
  },

  async getAllTrips(){
    const getTrips = await tripRepository.findTripAll();
    return getTrips;
  },

  async updateTrip(tripId, tripData){
    const updateTrip = await tripRepository.update(tripId, tripData);
    if (!updateTrip) {
      throw new AppError(commonErrors.resourceNotFoundError, 404, "trip not found");
    }
    return updateTrip;
  },

  async deleteTrip(tripId){
    const deleteTrip = await tripRepository.delete(tripId);
    if (!deleteTrip) {
      throw new AppError(commonErrors.resourceNotFoundError, 404, "trip not found");
    }
    return deleteTrip;
  },

}

module.exports = TripService;