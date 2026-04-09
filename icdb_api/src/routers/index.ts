import { Router } from "express";
import api from "./api";

export default new Map<string, Router>([
    ['/api', api]
])