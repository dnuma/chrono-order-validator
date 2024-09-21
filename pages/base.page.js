
const ApiCalls = require("../lib/utils/apiCalls");

export class BasePage {
	constructor(page) {
		this.page = page;

	}

	/**
	* Fetches the publication times for the provided articles.
	* @param request APIRequestContext object for making API calls.
	* @param results Array of article IDs or data objects from which to fetch the publication times.
	* @returns Array of timestamps for the articles.
	*/
	async getTimes(request, results) {
		const apiCalls = new ApiCalls();
		let times = [];

		for (const result of results) {
			const time = await apiCalls.getTimeOfStory(request, result);
			times.push(time);
		}

		return times;
	}

	/**
	 * Validates if the provided publication times are in chronological order.
	 * @param times Array of timestamps for the articles.
	 * @returns A boolean indicating whether the times are in descending chronological order.
	 */
	async validateChronologicalOrder(times) {
		// Check if each time is less than or equal to the previous one
		const isChronological = times.every((time, index) => {
			if (index === 0) return true;
			return time <= times[index - 1];
		});

		return isChronological;
	}

}

module.exports = BasePage;