# qotd

[![Cypress Dashboard](https://img.shields.io/badge/cypress-dashboard-green)](https://dashboard.cypress.io/projects/meud3z/runs)

Buildkite [![Buildkite Build Status](https://badge.buildkite.com/bd5a1ccb1b4aef4f0a4ce5ca9f940dae083c4120a2c323fb24.svg)](https://buildkite.com/cy-joe/quotr)

CircleCI [![CircleCI Build Status](https://circleci.com/gh/CypressJoseph/qotd.svg?style=svg)](<https://circleci.com/gh/CypressJoseph/qotd>)

Travis CI [![Travis Build Status](https://travis-ci.com/CypressJoseph/qotd.svg?branch=master)](https://travis-ci.com/CypressJoseph/qotd)

Netlify [![Netlify Deployment Status](https://api.netlify.com/api/v1/badges/f58b2fad-24d7-424a-87fb-82a3180f3af7/deploy-status)](https://app.netlify.com/sites/qotd-dashboard/deploys) 


## Synopsis

`qotd` is a tiny frontend application that serves a friendly, daily dashboard, which reminds you of the current day of the week and offers an inspiring quote. It interacts with several APIs (a quote-of-the-day service, the unsplash source API, the dark sky weather api and geolocation) and is intended to be a tiny reference application for end-to-end testing with Cypress.

## Testing

We have a little test harness in Jest but mostly we are tested with Cypress. Example configuration for both circle and travis is provided.

## Deployment

Netlify is our deployment system, and runs on every commit, but it checks the cypress suite is passing before deploying to production.
