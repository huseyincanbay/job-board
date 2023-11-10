import { DataSource } from "typeorm";
import { postgresql } from "./config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: postgresql.host,
  port: parseInt(postgresql.port || "5432"),
  username: postgresql.username,
  password: postgresql.password,
  database: postgresql.name,
  synchronize: true,
  logging: true,
  entities: [__dirname + '/../src/entities/*.ts'], // we are going to write entities here
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});