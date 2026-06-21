import { Router, type IRouter } from "express";
import healthRouter from "./health";
import serverStatusRouter from "./server-status";
import newsRouter from "./news";
import downloadsRouter from "./downloads";
import wikiRouter from "./wiki";
import authRouter from "./auth";

const router: IRouter = Router();

router.use(healthRouter);
router.use(serverStatusRouter);
router.use(newsRouter);
router.use(downloadsRouter);
router.use(wikiRouter);
router.use(authRouter);

export default router;
