import { AppDataSource } from '../database/datasource'
import { jobtypeEntity } from "../entity/jobType.entity";
import { error } from 'console';

export class jobTypeController {
    public async getjobType(req: any, res: any) {
        try {
            const jobType = AppDataSource.getRepository(jobtypeEntity)
            const jobTypedata = await jobType.find({ where: { is_active: 1 } })
            return res.status(200).send(jobTypedata)
        } catch (error) {
            return res.status(500).send("internal server error")
        }

    }
   
    public async addjobType(req: any, res: any) {
        try {
            const jobTypeRepository = AppDataSource.getRepository(jobtypeEntity)

            let jobTypeData: any = {
                name: req?.body?.name,
                is_active: 1
            };

            const newjobType = jobTypeRepository.create(jobTypeData)
            const addnewjobType = jobTypeRepository.save(newjobType)
            return res.status(200).send(addnewjobType)

        } catch (error) {
            return res.status(500).send("internal server error")
        }
    }

    public async updatejobType(req: any, res: any) {

        try {

            const jobTypeId = req?.params?.id

            const jobTypeRepository = AppDataSource.getRepository(jobtypeEntity)
            const jobTypeDetail = await jobTypeRepository.findOne({ where: { id: jobTypeId } })
            if (!jobTypeDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }
            if (jobTypeDetail['is_active'] == 0) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }

            const jobTypeData = {
                name: req?.body?.name
            }


            const jobType = jobTypeRepository.merge(jobTypeDetail, jobTypeData)

            const updatejobType = jobTypeRepository.save(jobType)
            return res.status(200).send(updatejobType);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error!!" });
        }

    }

    public async softdelete(req: any, res: any) {
        try {
            const jobTypeId = req?.params?.id
            const { is_active } = req?.body
            const jobType = AppDataSource.getRepository(jobtypeEntity)

            const jobTypeDetail = await jobType.findOne({ where: { id: jobTypeId } })

            if (!jobTypeDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE')
            }

            jobTypeDetail['is_active'] = is_active

            const jobTypeStatus = await jobType.save(jobTypeDetail)
            return res.send(jobTypeStatus)

        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal server error");
        }

    }
}