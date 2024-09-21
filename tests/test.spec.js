require("dotenv").config();
import { test, expect } from '@playwright/test';
import YCombinatorPage from '../pages/yCombinator.page';
import ApiCalls from '../lib/utils/apiCalls';

test.beforeEach(async ({ page }) => {
  const hackerNewsTitle = "New Links | Hacker News";

  await page.goto('/newest');
  expect(page).toHaveTitle(hackerNewsTitle);
});

/**
 * This test navigates through the Hacker News "Newest" page and validates 
 * that the articles are sorted from newest to oldest based on their publication times.
 */
test.describe("Front End and API testing using Playwright",
  {
    tag: '@hackerNews'
  },
  () => {

    test(`API Testing`,
      {
        tag: ['@api'],
        annotation: { 
          type: 'Type',
          description: `API testing using APIRequestContext ` }
      },
      async ({ page, request }) => {

        const maxArticles = process.env.MAX_ARTICLES;

        const apiCalls = new ApiCalls();
        const yCombinatorPage = new YCombinatorPage(page);
        const results = await apiCalls.getNewestStories(request);

        // Fetched articles must be greater that the required amount
        expect(results.length > maxArticles).toBeTruthy();

        const trimmedResults = results.slice(0, maxArticles);

        const times = await yCombinatorPage.getTimes(request, trimmedResults);
        const isChronological = await yCombinatorPage.validateChronologicalOrder(times);

        expect(await isChronological).toBeTruthy();

      });

    test('Front End testing',
      {
        tag: ['@fe'],
        annotation: { 
          type: 'Type',
          description: `Front End testing navigating using Locators` }
      },
      async ({ page }) => {

        const maxArticles = parseInt(process.env.MAX_ARTICLES, 10) || 0;
        const yCombinatorPage = new YCombinatorPage(page);
        const articlesPerPage = await yCombinatorPage.getArticlesPerPage();
        
        let pagesLeft = Math.floor(maxArticles / articlesPerPage);
        let times = [];

        // Fetch articles from multiple pages
        for(let i = pagesLeft; i > 0; i--){
          for(let j = 0; j < articlesPerPage; j++) {
            times.push(await yCombinatorPage.getTimePerArticle(j));
          }
          await yCombinatorPage.showMoreArticles();
        }

        // Get the rest of the articles in the last page (if any)
        const remainingArticles = maxArticles % articlesPerPage;
        for(let i = 0; i < remainingArticles; i++) {
          times.push(await yCombinatorPage.getTimePerArticle(i));
        }

        const isChronological = await yCombinatorPage.validateChronologicalOrder(times);
        expect.soft(await isChronological, {message: "Chronological order validation"}).toBeTruthy();
        expect.soft(times.length, { message: "Max article validation"}).toEqual(maxArticles);

      });

      
  });

