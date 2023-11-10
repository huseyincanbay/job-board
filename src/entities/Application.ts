import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
  } from "typeorm";
  import { Job } from "./Job";
  import { User } from "./User";

  @Entity('applications')
  export class Application {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.applications)
    user: User;

    @ManyToOne(() => Job, (job) => job.applications)
    job: Job;
  }