import hello from "./hello";
import { Router } from "express";

const v1 = Router();

const v1Routers = new Map<string, Router>([
  ["/hello", hello],
]);

v1Routers.forEach((router, path) => {
  v1.use(path, router);
});

export default v1;