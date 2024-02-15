### Setting up

- run `npm install` to install required dependencies
- run `npm run start` to serve the app locally in `http://localhost:3000/`
- import `todo_app.postman_collection.json` in postman

### Testing flow

There are pre-registered users in the `MockDb.js` file. This is for testing purposes so we don't need to setup a db. `user1` specifically have 2 tasks already set up for testing.

- Register
  - You may use the localhost:3000/register route to register a user (Request body is already pre-configured - so just run as you wish)
- Login
  - You may login using localhost:3000/login route to receive your access token, all tasks-related routes uses this access token in their request headers. (Note that access tokens are configured to expire after 30 mins)
- Tasks CRUD/Reorder
  - You may refer to the postman collection for all the tasks CRUD and reordering API. They should already be pre-configured for ease of testing
  - When you encounter `Forbidden` response, please use the login route again to refresh your accessToken and replace your request header's accessToken with the new one.
