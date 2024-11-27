import { Router } from "express";
import {
  getAvailableCountries,
  getCountryInfo,
} from "../controllers/countryController";

const router = Router();

router.get("/available-countries", getAvailableCountries);
router.get("/country-info/:code", getCountryInfo);

export default router;
