const request = require('supertest');
const { createServer } = require('../app');

describe('Color Display App', () => {
  let app, server;

  // Close the server cleanly after each test
  afterEach((done) => {
    if (server && server.close) server.close(done);
    else done();
  });

  test('should return default color (blue)', (done) => {
    delete process.env.COLOR;
    const { app: testApp } = createServer();
    server = testApp.listen(0, () => {
      request(testApp).get('/').expect(200).then(res => {
        expect(res.text).toContain('background-color: blue');
        done();
      });
    });
  });

  test('should return the custom color when set via env', (done) => {
    process.env.COLOR = 'green';
    const { app: testApp } = createServer();
    server = testApp.listen(0, () => {
      request(testApp).get('/').expect(200).then(res => {
        expect(res.text).toContain('background-color: green');
        done();
      });
    });
  });

  test('should display calendar when CALENDAR=true', (done) => {
    process.env.CALENDAR = 'true';
    const { app: testApp } = createServer();
    server = testApp.listen(0, () => {
      request(testApp).get('/').expect(200).then(res => {
        expect(res.text).toMatch(/\b(Su|Mo|Tu|We|Th|Fr|Sa)\b/);
        expect(res.text).not.toContain('Calendar not set');
        done();
      });
    });
  });

  test('should show "Calendar not set" when CALENDAR is not true', (done) => {
    process.env.CALENDAR = 'false';
    const { app: testApp } = createServer();
    server = testApp.listen(0, () => {
      request(testApp).get('/').expect(200).then(res => {
        expect(res.text).toContain('Calendar not set');
        done();
      });
    });
  });

  test('should show "Country not set" if COUNTRY is undefined', (done) => {
    delete process.env.COUNTRY;
    const { app: testApp } = createServer();
    server = testApp.listen(0, () => {
      request(testApp).get('/').expect(200).then(res => {
        expect(res.text).toContain('Country not set');
        done();
      });
    });
  });

  test('should display the COUNTRY when it is set', (done) => {
    process.env.COUNTRY = 'Denmark';
    const { app: testApp } = createServer();
    server = testApp.listen(0, () => {
      request(testApp).get('/').expect(200).then(res => {
        expect(res.text).toContain('Denmark');
        done();
      });
    });
  });
});
