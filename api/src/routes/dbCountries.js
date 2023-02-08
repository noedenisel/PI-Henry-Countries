const axios = require ('axios');
const { Country, } = require ('../db')




async function dbCountries(req, res) {
  try {
    {
      const AllCountApi = await axios.get("www.restcountries.com/v3.1/all");
      const ModelCountries = AllCountApi.data.map((e) => {
        return {
          name: e.name,
          id: e.alpha3Code,
          flag: e.flag,
          region: e.region,
          continents: e.continents,
          subregion: e.subregion,
          area: e.area,
          population: e.population,
        };
      });
      ModelCountries.forEach(async (e) => {
        await Country.create({
          where: {
            name: e.name,
            id: e.id,
            flag: e.flagimg,
            region: e.region,
            continents: e.continents,
            subregion: e.subregion,
            area: e.area,
            population: e.population,
          },
        });
      });
    }
    console.log('DB success')
  } catch (error) {
    res.send(error);
  }
}
module.exports= { dbCountries}