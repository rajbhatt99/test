import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { designationEntity } from "../entity/designation.entity";
import { taskEntity } from './task.entity';

@Entity()
export class users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    designation_id!:number;

    @Column()
    mobile!: Number;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    age!: number;

    @Column()
    is_active!: Number;

    @ManyToOne(()=>designationEntity)
    @JoinColumn({name:'designation_id',referencedColumnName:'id'})
    designation!:designationEntity;

    @JoinColumn()
    @OneToMany(()=>taskEntity,(taskEntity)=>taskEntity.id)
    tasks!: taskEntity;

}
