import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm";
import { taskEntity } from "./task.entity";

@Entity('job_type_master')
export class jobtypeEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    is_active!: Number;

    @OneToMany(() => taskEntity,task=>task.id)
    @JoinColumn({name:"task_id",referencedColumnName:"id"})
    @Column()
    task_id!: number;
}

