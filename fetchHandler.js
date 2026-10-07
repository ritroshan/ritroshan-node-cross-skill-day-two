const API_END_POINT = [
  "https://api.disneyapi.dev/character",
  "https://catfact.ninja/breeds",
  "https://dogapi.dog/api/v2/breeds",
  "https://stephen-king-api.onrender.com/api/books",
  "https://wizard-world-api.herokuapp.com/Elixirs",
  "http://api.citybik.es/v2/networks",
  "https://parallelum.com.br/fipe/api/v1/carros/marcas",
  "https://pokeapi.co/api/v2/pokemon/ditto",
];

const parallelReq = async function () {
  const startTime = Date.now();
  console.log("Start time:", new Date());

  const results = await Promise.allSettled(
    API_END_POINT.map(async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
      return res.json();
    }),
  );

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`${API_END_POINT[i]}`, result.value ? true : false);
    } else {
      console.error(`${API_END_POINT[i]}`, result.reason.message);
    }
  });
  console.log("End time:", Date.now() - startTime, "ms");
};
parallelReq();

const sequentialReq = async function () {
  for (let url of API_END_POINT) {
    const start = Date.now();
    console.log("Start time:", new Date());
    try {
      let res = await fetch(url);
      console.log("Response is", (await res.json()) ? true : false);
    } catch (error) {
      console.log("Error:", error?.message);
    }
    console.log("End time", Date.now() - start, "ms");
  }
};
sequentialReq();
