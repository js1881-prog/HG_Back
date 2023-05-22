/**
 * searchService,
 * @param {Object} searchRepository - The search repository object.
 * @param {Function} AppError - The AppError class.
 * @param {Object} commonErrors - The commonErrors object.
 * @param {Object} logger - The logger object.
 * @returns {Object} The search service object.
 */

const searchService = (searchRepository, AppError, commonErrors, logger) => ({
  /**
   * Search trips by keyword.
   * @param {string} keyword - The keyword to search for.
   * @returns {Array} The matching trips.
   */
  search: async (keyword) => {
    const trips = await searchRepository.search(keyword);
    return trips;
  },
});

module.exports = searchService;
