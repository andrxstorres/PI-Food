//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Diet } = require("./src/db.js");

// Syncing all the models at once.
const force = { force: true };

conn.sync(force).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });

  if (force.force) {
    const dietsTypes = [
      "gluten free",
      "ketogenic",
      "vegetarian",
      // "lacto vegetarian",
      // "ovo vegetarian",
      "lacto ovo vegetarian",
      "vegan",
      "pescatarian",
      "paleolithic",
      "primal",
      "fodmap friendly",
      "whole 30",
    ];
    let dietId = 0;
    const promisedDiets = dietsTypes.map((diet) => {
      dietId++;
      return Diet.create({ id: dietId, name: diet });
    });
    Promise.all(promisedDiets)
      .then(() => console.log("--------------Diets were loaded in DB!--------------"))
      .catch((err) => console.log({ m: "Something went wrong when creating diets in database.", err }));
  }
});
