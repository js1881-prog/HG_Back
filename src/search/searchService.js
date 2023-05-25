/**
 * searchService,
 * @param {Object} searchRepository - The search repository object.
 * @returns {Object} The search service object.
 */

const searchService = (searchRepository) => ({
  /**
   * Search trips by keyword.
   * @param {string} keyword - The keyword to search for.
   * @param {number} page - The page number.
   * @param {number} limit - The number of results per page.
   * @returns {Array} The matching trips.
   */
  search: async (keyword, page, limit) => {
    const trips = await searchRepository.search(keyword, page, limit);
    return trips;
  },
});

module.exports = searchService;
