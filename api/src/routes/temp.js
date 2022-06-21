const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Op, Temper } = require("../db");

router.get("/", async (req, res) => {
  const apiData = await axios.get(
    "https://api.thedogapi.com/v1/breeds?api_key=29117eac-fbd3-4f74-9260-69b8c2959c19"
  );
  let temperaments = [];
  apiData.data.forEach((race) => {
    if (race.temperament) {
      const arrayTemps = race.temperament.split(", ");
      temperaments = temperaments.concat(arrayTemps);
    }
  });
  let filteredTemperaments = temperaments.filter((temp, index) => {
    return temperaments.indexOf(temp) === index;
  });
  filteredTemperaments.forEach(async (temp) => {
    const createdTemp = await Temper.create({ name: temp });
  });
  return res.send(
    "Los temperamentos se han añadido a la base de datos correctamente"
  );
});

module.exports = router;
