import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
  } from "typeorm";
import { User } from "./User";
import { Application } from "./Application";

@Entity('jobs')
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    company: string;

    @Column()
    description: string;

    @Column()
    requirements: string;

    @Column()
    location: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    salary: number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.jobs)
    user: User;

    @OneToMany(() => Application, (application) => application.job)
    applications: Application[]; 
}