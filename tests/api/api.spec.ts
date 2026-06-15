import { test, expect } from '@playwright/test';

test.describe('API Testing', () => {
  test('GET placeholder post returns correct data', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toMatchObject({
      userId: 1,
      id: 1,
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('POST placeholder post creates a resource', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'Playwright API Test',
        body: 'This is a sample test case for API testing.',
        userId: 123,
      },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toMatchObject({
      title: 'Playwright API Test',
      body: 'This is a sample test case for API testing.',
      userId: 123,
      id: expect.any(Number),
    });
  });
});
