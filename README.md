# Spotify now playing

Made with `create-react-app`

## Get started

- Head over to https://developer.spotify.com/web-api/ and create a spotify developer account to obtain a client id and secret
- Follow instructions [here](https://developer.spotify.com/documentation/general/guides/authorization-guide/) to get authenticated with Spotify and receive a refresh token
- Copy `.env.example` file, populate it with your client id and secret, and refresh token from Spotify, and rename it to `.env`

Run locally with `$ yarn start`


### More detailed guide on getting Spotify Refresh Token
Visit the following URL in your browser: (swap out <PLACEHOLDER> for your actual values)
https://accounts.spotify.com/authorize?client_id=<CLIENTID>&redirect_uri=<REDIRECTURI>&response_type=code&scope=user-read-currently-playing%20user-read-playback-state%20user-modify-playback-state

The redirect_uri must be the exact same as the one in your application settings at https://developer.spotify.com/web-api/, you can use
http://localhost:3000/ for this.

In the browser, you will then be redirected to something like:
`http://localhost:3000/?code=AQAhr5FYjoXrJJiLBpsXg3gCpHsunO_qRgmPq3REjvp7nJ0aWVWxGlWmylvuCJia7mO4oL31mSerZ5JyvLm1KuBVMiZkgKD6AoaVwotfJ4kBmgn53`
Copy everything after `code=`

Now you must make a POST request, you can do this however you like but lets assume we are using Postman:

`POST` - https://accounts.spotify.com/api/token
`Headers` - Content-Type: application/x-www-form-urlencoded
`grant_type` - authorization_code
`code` - {CODE FROM PREVIOUS URL}
`redirect_uri` - {REDIRECT URL FROM SPOTIFY APP SETTINGS}
`client_id` - {CLIENT ID}
`client_secret` - {CLIENT SECRET}

The response should have a Refresh_Token, copy this and store it in your .env file
