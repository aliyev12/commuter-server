const { fetchRoutesInfo } = require("../utils/fetchRoutesInfo");

const errorMsg = "Something went wrong while updating routes info";

async function updateRoutesInfoController(req, res) {
  const secretKey = req.body.secretKey;
  if (secretKey && secretKey === process.env.UPDATE_ROUTES_KEY) {
    try {
      await fetchRoutesInfo();
      res.status(200).json({
        message: "Successfully updated routes info",
      });
    } catch (error) {
      res.status(500).json({
        message: errorMsg,
      });
    }
  } else {
    res.status(500).json({
      message: errorMsg,
    });
  }
}

module.exports = updateRoutesInfoController;

/*
POST
http://localhost:3333/api/update-routes-info


{
    "secretKey": "xxxxxx"
}

*/
