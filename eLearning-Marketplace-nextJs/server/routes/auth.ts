
import { requireSignin } from './../middlewares/index';
import express, { Request, Response } from "express"
import { auth, login, logout, currentUser} from "../controller";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
	res.send("Express + TypeScript Server")
})

router.post('/register', auth)
router.post('/login', login)
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);

export default router
