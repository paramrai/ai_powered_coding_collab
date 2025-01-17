import * as ai from "../services/ai.service.js";
import { InternalServerError } from "../utils/errorClass.js";

export const getResultController = async (req, res, next) => {
  try {
    const { prompt } = req.query;
    const result = await ai.generateResult(prompt);
    res.send(result);
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};
