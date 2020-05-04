import { MigrationInterface, getConnectionOptions } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";

export class Lista1588545670716 implements MigrationInterface {

  public async up(mongoRunner: MongoQueryRunner): Promise<any> {
    const database = (await getConnectionOptions()).database as string;
    await mongoRunner
      .databaseConnection
      .db(database)
      .createCollection('lista');
  }

  public async down(mongoRunner: MongoQueryRunner): Promise<any> {
    const database = (await getConnectionOptions()).database as string;

    await mongoRunner.databaseConnection.db(database).dropCollection('lista')
  }
}
