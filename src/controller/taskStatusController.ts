import { AppDataSource } from '../database/datasource'
import { taskStatusEntity } from "../entity/taskStatus.entity";
import { error } from 'console';

export class taskStatusController {
    public async gettaskStatus(req: any, res: any) {
        try {
            const taskStatus = AppDataSource.getRepository(taskStatusEntity)
            const taskStatusdata = await taskStatus.find({ where: { is_active: 1 } })
            return res.status(200).send(taskStatusdata)
        } catch (error) {
            return res.status(500).send("internal server error")
        }

    }
    public async addtaskStatus(req: any, res: any) {
        try {
            const taskStatus = AppDataSource.getRepository(taskStatusEntity)
            let taskStatusData: any = {
                name: req?.body?.name,
                is_active: 1
            };

            const newtaskStatus = taskStatus.create(taskStatusData)
            const addnewtaskStatus = taskStatus.save(newtaskStatus)
            return res.status(200).send(addnewtaskStatus)

        } catch (error) {
            return res.status(500).send("internal server error")
        }
    }
    public async updatetaskStatus(req: any, res: any) {

        try {

            const taskStatusId = req?.params?.id

            const taskStatusRepository = AppDataSource.getRepository(taskStatusEntity)
            const taskStatusDetail = await taskStatusRepository.findOne({ where: { id: taskStatusId } })
            if (!taskStatusDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }
            if (taskStatusDetail['is_active'] == 0) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }

            const taskStatusData = {
                name: req?.body?.name
            }


            const taskStatus = taskStatusRepository.merge(taskStatusDetail, taskStatusData)

            const updatetaskStatus = taskStatusRepository.save(taskStatus)
            return res.status(200).send(updatetaskStatus);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error!!" });
        }

    }

    public async softdelete(req: any, res: any) {
        try {
            const taskStatusId = req?.params?.id
            const { is_active } = req?.body
            const taskStatus = AppDataSource.getRepository(taskStatusEntity)

            const taskStatusDetail = await taskStatus.findOne({ where: { id: taskStatusId } })

            if (!taskStatusDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE')
            }

            taskStatusDetail['is_active'] = is_active

            const taskstatus = await taskStatus.save(taskStatusDetail)
            return res.send(taskstatus)

        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal server error");
        }

    }
}