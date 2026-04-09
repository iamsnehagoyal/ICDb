import { Router } from "express";
import { helloController } from "../controllers";

const hello = Router();
hello.get("/world", helloController.helloWorld);

export default hello;

// react + vite
// ngnix
// mongo
// express + node 
// docker + docker compose