const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Race, Op, Race_Temper, Temper } = require("../db");

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (!name) {
    const apiData = await axios.get(
      "https://api.thedogapi.com/v1/breeds?api_key=29117eac-fbd3-4f74-9260-69b8c2959c19"
    );
    const dbData = await Race.findAll();
    const data = apiData.data.concat(dbData);
    const neededData = data.map((dog) => {
      return {
        name: dog.name,
        image: dog.image.url,
        temperament: dog.temperament,
        weight: dog.weight,
      };
    });
    return res.json(neededData);
  }

  const dogApiData = await axios.get(
    `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=29117eac-fbd3-4f74-9260-69b8c2959c19`
  );
  const dogDbData = await Race.findAll({
    where: { name: { [Op.iLike]: name } },
  });
  if (dogDbData.length > 0) {
    const totalData = dogApiData.data.concat(dogDbData[0].dataValues);
    if (totalData.length === 0) {
      return res.json("No se encontró el perro");
    } else return res.json(totalData);
  } else {
    if (dogApiData.data.length === 0) {
      return res.json("No se encontró el perro");
    } else return res.json(dogApiData.data);
  }
});

router.get("/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  const id = Number(idRaza);
  if (!isNaN(id)) {
    const apiData = await axios.get(
      "https://api.thedogapi.com/v1/breeds?api_key=29117eac-fbd3-4f74-9260-69b8c2959c19"
    );
    const race = apiData.data.find((r) => {
      return r.id === id;
    });
    if (race) {
      const raceDetailData = {
        name: race.name,
        image: race.image.url,
        temperament: race.temperament,
        height: race.height.metric,
        weight: race.weight.metric,
        lifeYears: race.life_span,
      };
      return res.json(raceDetailData);
    }
  }
  const dbRace = await Race.findByPk(idRaza);
  const dbTemperament = await Race_Temper.findAll({
    where: { RaceId: idRaza },
  });
  let raceTemperaments = "";
  dbTemperament.forEach((temp, i) => {
    const tempId = temp.dataValues.TemperId;
    Temper.findByPk(tempId).then((temper) => {
      if (i === dbTemperament.length - 1) {
        raceTemperaments = raceTemperaments + `${temper.dataValues.name}`;
        return res.json({
          name: dbRace.dataValues.name,
          height: dbRace.dataValues.height,
          weight: dbRace.dataValues.weight,
          lifeYears: dbRace.dataValues.lifeYears,
          temperament: raceTemperaments,
        });
      } else {
        raceTemperaments = raceTemperaments + `${temper.dataValues.name}, `;
      }
    });
    // const tempData = await Temper.findByPk(tempId);
    // const tempName = tempData.dataValues.name;
    // if (i === dbTemperament.length - 1) {
    //   raceTemperaments = raceTemperaments + `${tempName}`;
    // } else {
    //   raceTemperaments = raceTemperaments + `${tempName}, `;
    // }
    // console.log(raceTemperaments);
  });
});

module.exports = router;
