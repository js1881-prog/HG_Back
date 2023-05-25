const tripRepository = require("./tripRepository");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const TripService = {
  async createTrip(tripData){
    const createTrips = await tripRepository.create(tripData);
    return createTrips;
  },

  async getTripById(tripId){
    const getTrip = await tripRepository.findTripById(tripId);
    if (!getTrip) {
      throw new AppError(commonErrors.resourceNotFoundError, 401, "Unauthorized");
    }
    return getTrip;
  },

  async getAllTrips(){
    const getTrips = await tripRepository.findTripAll();
    return getTrips;
  },

  async updateTrip(tripId, tripData){
    const updateTrip = await tripRepository.update(tripId, tripData);
    if (!updateTrip) {
      throw new AppError(commonErrors.resourceNotFoundError, 401, "Unauthorized");
    }
    return updateTrip;
  },

  async deleteTrip(tripId){
    const deleteTrip = await tripRepository.delete(tripId);
    if (!deleteTrip) {
      throw new AppError(commonErrors.resourceNotFoundError, 401, "Unauthorized");
    }
    return deleteTrip;
  },

}

module.exports = TripService;