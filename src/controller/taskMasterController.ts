import { AppDataSource } from '../database/datasource'
import { taskMasterEntity } from "../entity/taskMaster.entity";
import { error } from 'console';

export class taskMasterController {
    public async gettaskMaster(req: any, res: any) {
        try {
            const taskMaster = AppDataSource.getRepository(taskMasterEntity)
            const taskMasterdata = await taskMaster.find({ where: { is_active: 1 } })
            return res.status(200).send(taskMasterdata)
        } catch (error) {
            return res.status(500).send("internal server error")
        }

    }
    public async addtaskMaster(req: any, res: any) {
        try {
            const taskMaster = AppDataSource.getRepository(taskMasterEntity)
            let taskMastetrData: any = {
                name: req?.body?.name,
                is_active: 1
            };

            const newtaskMaster = taskMaster.create(taskMastetrData)
            const addnewtaskMaster = taskMaster.save(newtaskMaster)
            return res.status(200).send(addnewtaskMaster)

        } catch (error) {
            return res.status(500).send("internal server error")
        }
    }
    public async updatetaskMaster(req: any, res: any) {

        try {

            const taskMasterId = req?.params?.id

            const taskMasterRepository = AppDataSource.getRepository(taskMasterEntity)
            const taskMasterDetail = await taskMasterRepository.findOne({ where: { id: taskMasterId } })
            if (!taskMasterDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }
            if (taskMasterDetail['is_active'] == 0) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }

            const taskMasterData = {
                name: req?.body?.name
            }


            const taskMaster = taskMasterRepository.merge(taskMasterDetail, taskMasterData)

            const updatetaskMaster = taskMasterRepository.save(taskMaster)
            return res.status(200).send(updatetaskMaster);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error!!" });
        }

    }

    public async softdelete(req: any, res: any) {
        try {
            const taskMasterId = req?.params?.id
            const { is_active } = req?.body
            const taskMasterRepository = AppDataSource.getRepository(taskMasterEntity)

            const taskMasterDetail = await taskMasterRepository.findOne({ where: { id: taskMasterId } })

            if (!taskMasterDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE')
            }

            taskMasterDetail['is_active'] = is_active

            const taskMaster = await taskMasterRepository.save(taskMasterDetail)
            return res.send(taskMaster)

        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal server error");
        }

    }
}