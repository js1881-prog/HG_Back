const tripRepository = require("./tripRepository");

const TripService = {
  async createTrip(tripData){
    const createTrips = await tripRepository.create(tripData);
    return createTrips;
  },

}

module.exports = TripService;