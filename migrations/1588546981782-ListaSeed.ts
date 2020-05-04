import { MigrationInterface, getConnectionOptions, getConnectionManager, getConnection } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";

export class ListaSeed1588546981782 implements MigrationInterface {

  public async up(mongoRunner: MongoQueryRunner): Promise<any> {
    const database = (await getConnectionOptions()).database as string;

    mongoRunner.databaseConnection.db(database)
    .collection('lista').insertMany([
      { descricao: "Pente de ovos", quantidade: 1 },
      { descricao: "Pão de forma", quantidade: 2 },
      { descricao: "Bandeja de presunto", quantidade: 3 },
      { descricao: "Bandeja de mussarela", quantidade: 4 }
    ]);
  }

  public async down(mongoRunner: MongoQueryRunner): Promise<any> {
    const database = (await getConnectionOptions()).database as string;
    mongoRunner.databaseConnection.db(database).collection('lista').remove({});
  }
}
