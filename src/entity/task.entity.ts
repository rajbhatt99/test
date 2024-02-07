
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
    is_active!: Number

    @ManyToOne(() => users)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @Column()
    user_id!: number;

    @ManyToOne(() => taskStatusEntity)
    @JoinColumn({ name: ' task_status_id', referencedColumnName: 'id' })
    @Column()
    task_status_id!: number;

    @ManyToOne(() => jobtypeEntity)
    @JoinColumn({ name: 'job_type_id', referencedColumnName: 'id' })
    @Column()
    job_type_id!: number;

    @ManyToOne(()=>jobEntity)
    @JoinColumn({name:"job_id",referencedColumnName:"id"})
    @Column()
    job_id!:number;
}
