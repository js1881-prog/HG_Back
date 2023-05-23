const tripviewsRepository = require("./tripviewsRepository");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const tripviewsService = {
  async createView(tripViewsData){
    const createView = await tripviewsRepository.create(tripViewsData);
    return createView;
  },

}

module.exports = tripviewsService;