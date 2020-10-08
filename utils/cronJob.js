const { fetchRoutesInfo } = require("./fetchRoutesInfo");

let count = 1;
function handleCronjob() {
  if (count === 4) {
    console.log("Runing cron job");
    fetchRoutesInfo();
    count = 0;
  } else {
    count = count + 1;
  }
}

module.exports = handleCronjob;
