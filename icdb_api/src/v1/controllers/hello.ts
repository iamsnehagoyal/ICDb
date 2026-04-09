import { Request, Response } from "express";
import { helloService } from "../services";

export async function helloWorld(req: Request, res: Response) {
  const result = await helloService.helloWorld();
  res.status(200).json(result);
}

// post register - 201 
// post login - 201
// delete logout token - 204
// get user details - 200 
// 404 not found 
// 400 validations paramter
