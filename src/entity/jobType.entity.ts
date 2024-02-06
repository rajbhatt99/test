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

    @JoinColumn()
    @OneToMany(() => taskEntity, (taskEntity) => taskEntity.id)
    tasks!: taskEntity;
}

