import { DataSource } from "typeorm";
import { users } from '../entity/user.entity';
import { designationEntity } from "../entity/designation.entity";
import { taskStatusEntity } from "../entity/taskStatus.entity";
import { jobtypeEntity } from "../entity/jobType.entity";
import { taskEntity } from "../entity/task.entity";
import { taskMasterEntity } from "../entity/taskMaster.entity";
import { jobStatusEntity } from "../entity/jobSatus.entity";
import { jobEntity } from "../entity/job.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345",
    database: "test",
    entities: [users, designationEntity, taskStatusEntity,jobtypeEntity,taskEntity,taskMasterEntity,jobStatusEntity,jobEntity],
    synchronize: true,
    logging: false,
    subscribers: [],
    migrations: [],
    extra: {
        insecureAuth: true,
    },
})