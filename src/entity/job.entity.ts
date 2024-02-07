
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { jobStatusEntity } from './jobSatus.entity';
import { jobtypeEntity } from './jobType.entity';

@Entity('job')
export class jobEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    // @Column()
    // job_status_id!: number;

    // @Column()
    // job_type_id!: number;

    @Column()
    is_active!: Number

    @ManyToOne(() => jobStatusEntity)
    @JoinColumn({ name: 'job_status_id', referencedColumnName: 'id' })
    @Column()
    job_status_id!: number;

    @ManyToOne(() => jobtypeEntity)
    @JoinColumn({ name: 'job_type_id', referencedColumnName: 'id' })
    @Column()
    job_type_id!: number;

}
