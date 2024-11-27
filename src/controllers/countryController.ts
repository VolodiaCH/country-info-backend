import { Request, Response } from "express";
import {
  fetchAvailableCountries,
  fetchCountryInfo,
} from "../services/countryService";

export const getAvailableCountries = async (req: Request, res: Response) => {
  try {
    const countries = await fetchAvailableCountries();
    res.json(countries);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch available countries", error });
  }
};

export const getCountryInfo = async (req: Request, res: Response) => {
  try {
    const countryCode = req.params.code;
    const countryInfo = await fetchCountryInfo(countryCode);
    res.json(countryInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch country info", error });
  }
};
