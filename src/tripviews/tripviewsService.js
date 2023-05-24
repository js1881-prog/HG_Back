const tripviewsRepository = require("./tripviewsRepository");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const tripviewsService = {
  async createView(tripViewsData){
    const createView = await tripviewsRepository.create(tripViewsData);
    return createView;
  },

  async updateView(tripViewId, tripViewsData){
    const updateView = await tripviewsRepository.update(tripViewId, tripViewsData);
    if (!updateView) {
      throw new AppError(commonErrors.resourceNotFoundError, 401, "Unauthorized");
    }
    return updateView;
  },

}

module.exports = tripviewsService;