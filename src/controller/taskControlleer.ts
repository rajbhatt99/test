import { AppDataSource } from '../database/datasource'
import { taskEntity } from "../entity/task.entity";
import { error } from 'console';

export class taskController {
    public async gettask(req: any, res: any) {
        try {
            const taskRepository = AppDataSource.getRepository(taskEntity)
            const taskdata = await taskRepository.find({ where: { is_active: 1 } })
            return res.status(200).send(taskdata)
        } catch (error) {
            return res.status(500).send("internal server error")
        }

    }
   
    public async addtask(req: any, res: any) {
        try {
            const taskRepository = AppDataSource.getRepository(taskEntity)

            let taskData: any = {
                name: req?.body?.name,
                is_active: 1
            };

            const newtask = taskRepository.create(taskData)
            const addnewtask = taskRepository.save(newtask)
            return res.status(200).send(addnewtask)

        } catch (error) {
            return res.status(500).send("internal server error")
        }
    }
    
    public async updatetask(req: any, res: any) {

        try {

            const taskId = req?.params?.id

            const taskRepository = AppDataSource.getRepository(taskEntity)
            const taskDetail = await taskRepository.findOne({ where: { id: taskId } })
            if (!taskDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }
            if (taskDetail['is_active'] == 0) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }

            const taskData = {
                name: req?.body?.name
            }


            const task = taskRepository.merge(taskDetail, taskData)

            const updatetask = taskRepository.save(task)
            return res.status(200).send(updatetask);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error!!" });
        }

    }

    public async softdelete(req: any, res: any) {
        try {
            const taskId = req?.params?.id
            const { is_active } = req?.body
            const task = AppDataSource.getRepository(taskEntity)

            const taskDetail = await task.findOne({ where: { id: taskId } })

            if (!taskDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE')
            }

            taskDetail['is_active'] = is_active

            const taskStatus = await task.save(taskDetail)
            return res.send(taskStatus)

        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal server error");
        }

    }
}