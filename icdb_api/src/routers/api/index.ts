import { Router } from "express";
import v1 from "../../v1/routers";

const api = Router();

const apiRouters = new Map<string, Router>([
  ["/v1", v1],
]);

apiRouters.forEach((router, path) => {
  api.use(path, router);
});

export default api;