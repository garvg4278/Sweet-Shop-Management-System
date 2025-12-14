import { Request, Response } from "express";
import {
    createRequest,
    getUserRequests,
    getAllRequests,
    fulfillRequest,
} from "../services/request.service";

export async function createRequestHandler(req: Request, res: Response) {
    const userId = req.user!.id;
    const { sweetId, quantity, unit } = req.body;

    const request = await createRequest(userId, sweetId, quantity, unit);
    res.status(201).json(request);
}

export async function getMyRequestsHandler(req: Request, res: Response) {
    const userId = req.user!.id;
    const requests = await getUserRequests(userId);
    res.json(requests);
}

export async function getAllRequestsHandler(req: Request, res: Response) {
    const requests = await getAllRequests();
    res.json(requests);
}

export async function fulfillRequestHandler(req: Request, res: Response) {
    const { id } = req.params;
    const updated = await fulfillRequest(id);
    res.json(updated);
}
