
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { users } from './user.entity';
import { jobStatusEntity } from './jobSatus.entity';
import { jobtypeEntity } from './jobType.entity';

@Entity('job')
export class jobEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    user_id!: number;

    @Column()
    job_status_id!: number;

    @Column()
    job_type_id!: number;

    @Column()
    is_active!: Number

    @ManyToOne(() => users)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    users!: users;

    @ManyToOne(() => jobEntity)
    @JoinColumn({ name: 'job_status_id', referencedColumnName: 'id' })
    jobStatus!: jobStatusEntity;

    @ManyToOne(() => jobtypeEntity)
    @JoinColumn({ name: 'job_type_id', referencedColumnName: 'id' })
    jobType!: jobtypeEntity;

}
