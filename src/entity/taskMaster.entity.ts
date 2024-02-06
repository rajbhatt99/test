import  { Entity , Column , PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne }   from 'typeorm';
import { jobtypeEntity } from './jobType.entity';


@Entity('task_master')
export class taskMasterEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    is_active!: Number ;

    @Column()
    job_type_id!:number;
    @ManyToOne(()=>jobtypeEntity)
    @JoinColumn({name:"job_type_id",referencedColumnName:"id"})
    jobtype!: jobtypeEntity;
}