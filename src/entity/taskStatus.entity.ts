import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { taskEntity } from './task.entity';

@Entity('task_status_master')
export class taskStatusEntity {
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