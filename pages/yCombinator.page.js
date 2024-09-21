const BasePage = require("./base.page");

export default class YCombinatorPage extends BasePage {
	constructor(page) {
    super(page);
		this.page = page;
    this.article = this.page.locator(`.athing`);
    this.more = this.page.locator(`.morelink`);
	}

  /**
   * Retrieves the number of articles displayed per page.
   * @returns {Promise<number>} The total count of articles on the current page.
   */
  async getArticlesPerPage() {
    return await this.article.count();
  }

  /**
   * Fetches the publication time of an article by its index on the current page.
   * @param {number} index - The index of the article on the page.
   * @returns {Promise<string | null>} The publication time of the article, as a string.
   */
  async getTimePerArticle(index){
    const time = await this.page.locator(`.athing + tr [title]`).nth(index);
    const timeValue = await time.getAttribute('title');
    return timeValue;
  }

  /**
   * Clicks the "More" button to load additional articles.
   */
  async showMoreArticles(){
    await this.more.click();
  }

}

module.exports = YCombinatorPage;