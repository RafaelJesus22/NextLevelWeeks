import express from 'express';
import ClassesControler from './controllers/classesControler';

const routes = express.Router();
const classesControler = new ClassesControler();


routes.post('/classes', classesControler.create);
routes.get('/classes', classesControler.index);


export default routes;
