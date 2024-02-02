import { Entity,PrimaryGeneratedColumn,Column, JoinColumn, OneToMany } from "typeorm";
import { taskEntity } from "./task.entity";

@Entity ('task_type_master')
export class tasktypeEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    is_active!: Number;

    @JoinColumn()
    @OneToMany(()=>taskEntity,(taskEntity)=>taskEntity.id)
    tasks!: taskEntity;
}

