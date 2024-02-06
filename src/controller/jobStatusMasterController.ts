import { AppDataSource } from '../database/datasource'
import { jobStatusEntity } from "../entity/jobSatus.entity";
import { error } from 'console';

export class jobStatusMasterController {
    public async getjobStatusMaster(req: any, res: any) {
        try {
            const jobStatusMaster = AppDataSource.getRepository(jobStatusEntity)
            const jobStatusMasterdata = await jobStatusMaster.find({ where: { is_active: 1 } })
            return res.status(200).send(jobStatusMasterdata)
        } catch (error) {
            return res.status(500).send("internal server error")
        }

    }
    public async addjobStatusMaster(req: any, res: any) {
        try {
            const jobStatusMaster = AppDataSource.getRepository(jobStatusEntity)
            let jobStatusMastetrData: any = {
                name: req?.body?.name,
                is_active: 1
            };

            const newjobStatusMaster = jobStatusMaster.create(jobStatusMastetrData)
            const addnewjobStatusMaster = jobStatusMaster.save(newjobStatusMaster)
            return res.status(200).send(addnewjobStatusMaster)

        } catch (error) {
            return res.status(500).send("internal server error")
        }
    }
    public async updatejobStatusMaster(req: any, res: any) {

        try {

            const jobStatusMasterId = req?.params?.id

            const jobStatusMasterRepository = AppDataSource.getRepository(jobStatusEntity)
            const jobStatusMasterDetail = await jobStatusMasterRepository.findOne({ where: { id: jobStatusMasterId } })
            if (!jobStatusMasterDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }
            if (jobStatusMasterDetail['is_active'] == 0) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }

            const jobStatusMasterData = {
                name: req?.body?.name
            }


            const jobStatusMaster = jobStatusMasterRepository.merge(jobStatusMasterDetail, jobStatusMasterData)

            const updatejobStatusMaster = jobStatusMasterRepository.save(jobStatusMaster)
            return res.status(200).send(updatejobStatusMaster);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error!!" });
        }

    }

    public async softdelete(req: any, res: any) {
        try {
            const jobStatusMasterId = req?.params?.id
            const { is_active } = req?.body
            const jobStatusMasterRepository = AppDataSource.getRepository(jobStatusEntity)

            const jobStatusMasterDetail = await jobStatusMasterRepository.findOne({ where: { id: jobStatusMasterId } })

            if (!jobStatusMasterDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE')
            }

            jobStatusMasterDetail['is_active'] = is_active

            const jobStatusMaster = await jobStatusMasterRepository.save(jobStatusMasterDetail)
            return res.send(jobStatusMaster)

        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal server error");
        }

    }
}