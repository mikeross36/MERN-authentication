import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validateSchema =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, params: req.params, query: req.query });
      next();
    } catch (err: any) {
      return res.status(400).send(err.errors);
    }
  };

export default validateSchema;
