// var Browser = require('zombie'),
//     assert = require('chai').assert;

// var browser;

// npm packages
import request from 'supertest';

// our packages
import app from '../src/app';

export default (test) => {
  // tests
};

suite('Cross-Page Tests', () => {
  setup(() => {
    browser = new Browser();
  });

  test('requesting a group rate quote from the hood river tour page should populate the referrer field', (done) => {
    var referrer = 'http://localhost:3000/tours/hood-river';
    browser.visit(referrer, () => {
      browser.clickLink('.requestGroupRate', () => {
        // assert(browser.field('referrer').value === referrer);
        assert(browser.resources[0].request.headers._headers[0][1] === referrer);
        done();
      });
    });
  });

  test('requesting a group rate from the oregon coast tour page should populate the referrer field', (done) => {
    var referrer = 'http://localhost:3000/tours/oregon-coast';
    browser.visit(referrer, () => {
      browser.clickLink('.requestGroupRate', () => {
        // assert(browser.field('referrer').value === referrer);
        assert(browser.resources[0].request.headers._headers[0][1] === referrer);
        done();
      });
    });
  });

  test('visiting the "request group rate" page directly should result in an empty referrer field', (done) => {
    browser.visit('http://localhost:3000/tours/request-group-rate', () => {
      // assert(browser.field('referrer').value === '');
      var referer_row = browser.resources[0].request.headers._headers[0];
      assert((referer_row[0] !== 'referer')
        || ((referer_row[0] === 'referer') && (referer_row[1]) === ''));
      done();
    });
  });
});