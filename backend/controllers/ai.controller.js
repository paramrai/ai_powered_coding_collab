import * as ai from "../services/ai.service.js";
import { InternalServerError } from "../utils/errorClass.js";

export const getResultController = async (req, res, next) => {
  try {
    const { prompt, referenceFiles } = req.body;
    const result = await ai.generateResult(prompt, referenceFiles);
    res.send(result);
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};
