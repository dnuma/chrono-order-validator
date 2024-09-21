require("dotenv").config();
class ApiCalls {

  /**
   * Fetches the newest stories from the API.
   * @param request APIRequestContext object for making API calls.
   * @returns An array of story IDs representing the newest stories.
   */
  async getNewestStories(request) {
    const response = await request.get(`${process.env.BASE_API_URL}/newstories.json?print=pretty`, {
      headers: {
        Accept: "application/json"
      },
    });
    return await response.json()
  }

  /**
   * Fetches the publication time of a specific story by its ID.
   * @param request APIRequestContext object for making API calls.
   * @param id The ID of the story to fetch the publication time for.
   * @returns A timestamp representing the publication time of the story.
   */
  async getTimeOfStory(request, id) {
    const response = await request.get(`${process.env.BASE_API_URL}/item/${id}.json?print=pretty`, {
      headers: {
        Accept: "application/json"
      },
    });
    const data = await response.json();
    return data.time;
  }
}

module.exports = ApiCalls;