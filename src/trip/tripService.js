const tripRepository = require("./tripRepository");

const TripService = {
  async createTrip(tripData){
    const createTrips = await tripRepository.create(tripData);
    return createTrips;
  },

  async getTrip(tripId){
    const getTrip = await tripRepository.findImageById(tripId);
    return getTrip;
  },

}

module.exports = TripService;