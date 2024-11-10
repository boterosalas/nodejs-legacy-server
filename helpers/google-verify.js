const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

async function googleVerify(idToken = "") {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email, picture, name } = ticket.getPayload();
  return {
    email,
    image: picture,
    name,
  };
}

module.exports = {
  googleVerify,
};
