import { Request, Response } from 'express'

import db from '../database/connection';


interface ScheduleItem {
  week_day: number;
  from: string;
  to: string
}

export default class ClassesControler {

  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;

    
    if (!filters.subject || !filters.week_day) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      });
    }

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])
    ;

    return response.json(classes);

  }


  async create (request: Request, response: Response) {

    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
  
    const tsx = await db.transaction();
  
    try {
      const insertedUsersIds =  await tsx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      });
    
      const user_id = insertedUsersIds[0];
    
      const insertedClassesIds =  await tsx('classes').insert({
        subject,
        cost,
        user_id
      });
    
      const class_id = insertedClassesIds[0];
    
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: scheduleItem.from, 
          to: scheduleItem.to
        };
      })
    
      await tsx('class_schedule').insert(classSchedule);
    
      await tsx.commit();
    
      return response.status(201).send()
  
    } catch(err) {
      await tsx.rollback();

      console.log(err);
      
      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }  
  }
}