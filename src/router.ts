import {Router} from "express";
import { rodolfoController } from "./controllers/RodolfoController";
const router = Router();

router.get('/rodolfos', rodolfoController.getRodolfos);
router.get('/rodolfos/:_id', rodolfoController.getRodolfoById);
router.get('/rodolfo', rodolfoController.randomRodolfo);
router.post('/rodolfos', rodolfoController.postRodolfo);
router.delete('/rodolfos/:_id', rodolfoController.deleteRodolfo);


export {router};