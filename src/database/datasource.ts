import { DataSource } from "typeorm";
import { users } from '../entity/user.entity';
import { designationEntity } from "../entity/designation.entity";
import { taskStatusEntity } from "../entity/taskStatus.entity";
import { tasktypeEntity } from "../entity/taskType.entity";
import { taskEntity } from "../entity/task.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345",
    database: "test",
    entities: [users, designationEntity, taskStatusEntity,tasktypeEntity,taskEntity],
    synchronize: true,
    logging: false,
    subscribers: [],
    migrations: [],
    extra: {
        insecureAuth: true,
    },
})