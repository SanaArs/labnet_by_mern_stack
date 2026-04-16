import  express from 'express'; 
import { createTest, getAllTests } from './test.controller.js';


const testRouter = express.Router();


testRouter.post((`/create-test`), createTest);
testRouter.get((`/all`), getAllTests);
export default testRouter;