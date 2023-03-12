import { Router } from "express";

import corsProxy from "./proxy/cors";

const router = Router();

router.use("/cors", corsProxy);

export default router;
