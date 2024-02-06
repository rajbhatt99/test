
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { users } from './user.entity';
import { taskStatusEntity } from './taskStatus.entity';
import { jobtypeEntity } from './jobType.entity';
import { jobEntity } from './job.entity';

@Entity('task')
export class taskEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    user_id!: number;

    @Column()
    task_status_id!: number;

    @Column()
    is_active!: Number

    @Column()
    job_id!:number;

    @ManyToOne(() => users)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    users!: users;

    @ManyToOne(() => taskStatusEntity)
    @JoinColumn({ name: ' task_status_id', referencedColumnName: 'id' })
    taskStatus!: taskStatusEntity;

    @ManyToOne(() => jobtypeEntity)
    @JoinColumn({ name: 'job_type_id', referencedColumnName: 'id' })
    jobType!: jobtypeEntity;

    @ManyToOne(()=>jobEntity)
    @JoinColumn({name:"job_id",referencedColumnName:"id"})
    job!:jobEntity;
}
