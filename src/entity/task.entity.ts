
import  { Entity , Column , PrimaryGeneratedColumn,OneToMany, JoinColumn, ManyToOne }   from 'typeorm';
import { users } from './user.entity';
import { taskStatusEntity } from './taskStatus.entity';
import { tasktypeEntity } from './taskType.entity';

@Entity('task')
export class taskEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;
    
    @Column()
    user_id!: number;
    
    @Column()
    status_id!: number;

    @Column()
    type_id!: number;

    @Column()
    is_active!: Number
    
    @JoinColumn()
    @ManyToOne(()=>users,(users)=>users.id)
    users!: users;

    @JoinColumn()
    @ManyToOne(()=>taskStatusEntity,(taskStatusEntity)=>taskStatusEntity.id)
    taskStatusEntity!: taskStatusEntity;

    @JoinColumn()
    @ManyToOne(()=>tasktypeEntity,(tasktypeEntity)=>tasktypeEntity.id)
    tasktypeEntity!: tasktypeEntity;

}
