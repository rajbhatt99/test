import { AppDataSource } from '../database/datasource'
import { jobEntity } from "../entity/job.entity";
import { error } from 'console';
import { taskEntity } from '../entity/task.entity';
import { taskMasterEntity } from '../entity/taskMaster.entity';

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
        // try {
        //     const jobRepository = AppDataSource.getRepository(jobEntity)
        //     let createjob: any;
        //     const jobData: any = {
        //         name: req?.body?.name,
        //         job_type_id: req?.body?.job_type_id,
        //         job_status_id: 1,
        //         is_active: 1
        //     };

        //     createjob = jobRepository.create(jobData)
        //     const addnewjob = await jobRepository.save({ ...createjob })
        //     // console.log(addnewjob);


        //     const taskMaster = AppDataSource.getRepository(taskMasterEntity)
        //     const taskMasterDetails = await taskMaster.find({ where: { job_type_id: req?.body?.job_type_id } })
        //     // console.log(taskMasterDetails);

        //     const createTask: any = {
        //         name: addnewjob?.name,
        //         is_active: 1,
        //         user_id: 1,
        //         job_type_id: jobData?.job_type_id,
        //         job_id: addnewjob?.id,
        //         task_satus_id: 1
        //     }
        //     console.log(createTask);

        //     const task = AppDataSource.getRepository(taskEntity)
        //     const newtask = await task.save(createTask)
        //     console.log(newtask);
            
        //     return res.status(200).send({ addnewjob, newtask })

        // } catch (error) {
        //     return res.status(500).send("internal server error")
        // }
        try {
            const jobRepository = AppDataSource.getRepository(jobEntity);
            const taskRepository = AppDataSource.getRepository(taskEntity);
        
            // Create a new job
            const newJobData: any = {
                name: req.body.name,
                job_type_id: req.body.job_type_id,
                job_status_id: 1,
                is_active: 1
            };
            const newJob = await jobRepository.save(newJobData);
        
            // Ensure the job was created successfully
            if (!newJob || !newJob.id) {
                return res.status(500).send("Failed to create job");
            }
        
            // Retrieve task details based on job type
            const taskMasterRepository = AppDataSource.getRepository(taskMasterEntity);
            const taskMasterDetails = await taskMasterRepository.find({ where: { job_type_id: newJob.job_type_id } });
        
            // Create tasks based on taskMasterDetails
            const tasksToCreate = taskMasterDetails.map((taskMasterDetail: any) => ({
                name: taskMasterDetail.name,
                is_active: 1,
                user_id: 1,
                job_type_id: newJob.job_type_id,
                job_id: newJob.id,
                task_status_id: 1 // Ensure the correct property name is used
            }));
        
            // Save tasks to the database
            const createdTasks = await taskRepository.save(tasksToCreate);
        
            // Check if tasks were created successfully
            if (!createdTasks || createdTasks.length === 0) {
                return res.status(500).send("Failed to create tasks");
            }
        
            // Return the created job and tasks
            return res.status(200).send({ newJob, createdTasks });
        
        } catch (error) {
            console.error("Error creating job and tasks:", error);
            return res.status(500).send("Internal server error");
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