import { AppDataSource } from '../database/datasource'
import { jobEntity } from "../entity/job.entity";
import { error } from 'console';

export class jobController {
    public async getjob(req: any, res: any) {
        try {
            const jobRepository = AppDataSource.getRepository(jobEntity)
            const jobdata = await jobRepository.find({ where: { is_active: 1 } })
            return res.status(200).send(jobdata)
        } catch (error) {
            return res.status(500).send("internal server error")
        }

    }
   
    public async addjob(req: any, res: any) {
        try {
            const jobRepository = AppDataSource.getRepository(jobEntity)

            let jobData: any = {
                name: req?.body?.name,
                is_active: 1
            };

            const newjob = jobRepository.create(jobData)
            const addnewjob = jobRepository.save(newjob)
            return res.status(200).send(addnewjob)

        } catch (error) {
            return res.status(500).send("internal server error")
        }
    }
    
    public async updatejob(req: any, res: any) {

        try {

            const jobId = req?.params?.id

            const jobRepository = AppDataSource.getRepository(jobEntity)
            const jobDetail = await jobRepository.findOne({ where: { id: jobId } })
            if (!jobDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }
            if (jobDetail['is_active'] == 0) {
                throw error('ERRORRRRR!!!! AEEEEEE');
            }

            const jobData = {
                name: req?.body?.name
            }


            const job = jobRepository.merge(jobDetail, jobData)

            const updatejob = jobRepository.save(job)
            return res.status(200).send(updatejob);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error!!" });
        }

    }

    public async softdelete(req: any, res: any) {
        try {
            const jobId = req?.params?.id
            const { is_active } = req?.body
            const job = AppDataSource.getRepository(jobEntity)

            const jobDetail = await job.findOne({ where: { id: jobId } })

            if (!jobDetail) {
                throw error('ERRORRRRR!!!! AEEEEEE')
            }

            jobDetail['is_active'] = is_active

            const jobStatus = await job.save(jobDetail)
            return res.send(jobStatus)

        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal server error");
        }

    }
}