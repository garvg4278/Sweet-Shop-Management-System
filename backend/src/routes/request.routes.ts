import { Router } from "express";
import {
    createRequestHandler,
    getMyRequestsHandler,
    getAllRequestsHandler,
    fulfillRequestHandler,
} from "../controllers/request.controller";

import authGuard from "../middleware/authGuard";
import adminGuard from "../middleware/adminGuard";


const router = Router();

// User creates a request
router.post("/", authGuard, createRequestHandler);

// User views own requests
router.get("/me", authGuard, getMyRequestsHandler);

// Admin views all requests
router.get("/", authGuard, adminGuard, getAllRequestsHandler);

// Admin fulfills a request
router.patch("/:id/fulfill", authGuard, adminGuard, fulfillRequestHandler);

export default router;
