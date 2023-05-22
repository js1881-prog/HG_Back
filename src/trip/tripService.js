const tripRepository = require("./tripRepository");

const TripService = {
  async createTrip(tripData){
    const createTrips = await tripRepository.create(tripData);
    return createTrips;
  },

  async getTrip(tripId){
    const getTrip = await tripRepository.findTripById(tripId);
    return getTrip;
  },

  async getAllTrips(){
    const getTrips = await tripRepository.findTripAll();
    return getTrips;
  },

  async updateTrip(tripId, tripData){
    const updateTrip = await tripRepository.updateTrip(tripId, tripData);
    return updateTrip;
  },

}

module.exports = TripService;