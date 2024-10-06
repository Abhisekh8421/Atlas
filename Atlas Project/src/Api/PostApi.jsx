import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});


export const getCountryData = async () => {
  return await api.get("/all?fields=name,population,region,capital,flags");
};


export const getCountryIndData = (name) => {
  return api.get(
    `/name/${name}?fullText=true&fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`
  );
};

export const getCountryPageData = async (page, limit = 8) => {
  const res = await api.get("/all?fields=name,population,region,capital,flags");

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = res.data.slice(startIndex, endIndex);

  return paginatedData;
};

export const getCountryNamedata = (name) => {
  if (name !== undefined) {
    return api.get(
      `https://restcountries.com/v3.1/name/${name}?fullText=true&fields=name`
    );
  }
};
