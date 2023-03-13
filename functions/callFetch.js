const axios = require("axios");

const { CAL_API, CAL_ID } = process.env;
const BASEPARAMS = `orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}`;
const BASEURL = `https://www.googleapis.com/calendar/v3/calendars/${CAL_ID}/events?${BASEPARAMS}`;

exports.handler = function (event, context, callback) {
  const finalURL = `${BASEURL}&key=${CAL_API}`;

  // send repsonse
  const send = (body) => {
    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify(body),
    });
  };

  const getdata = () => {
    axios
      .get(finalURL)
      .then((res) => send(res.data))
      .catch((err) => send(err));
  };

  if (event.httpMethod == "GET") {
    getdata();
  }
};
