const { assert } = require('chai');
const request = require('supertest');

const app = require('../../app');

const { parseTextFromHTML, seedItemToDatabase } = require('../test-utils');
const { connectDatabaseAndDropData, diconnectDatabase } = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  it('should create item and show info', async () => {
    // Setup
    const itemToCreate = await seedItemToDatabase();

    // Exercise
    const response = await request(app)
      .get(`/items/${itemToCreate._id}`);

    // Verification
    assert.include(parseTextFromHTML(response.text, '#item-title'), itemToCreate.title);
    assert.include(parseTextFromHTML(response.text, '#item-description'), itemToCreate.description);
  });
});
