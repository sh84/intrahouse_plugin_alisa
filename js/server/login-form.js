"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginForm = `<!DOCTYPE html><html>
<head>
  <meta charSet="utf-8"/>
  <title>Login</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
</head>
<body>
  <form action="/oauth/authorize" method="post">
    <input type="hidden" name="reqParams" value="{reqParams}">
    <label for="name">Name:</label>
    <input id="name" name="name" type="text">
    <label for="password">Password:</label>
    <input id="password" name="password" type="password">
    <input type="submit" value="Send">
  </form>
</body>
`;
exports.default = loginForm;
