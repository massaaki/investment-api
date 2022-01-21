import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import Database from 'better-sqlite3';

export class TestHelper {

  private static _instance: TestHelper;

  private constructor() {}

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private dbConnect!: Connection;
  private testdb!: Database.Database;


  async setupTestDB() {
    const defaultOptions = await getConnectionOptions();
    this.testdb = new Database(':memory:', { verbose: console.log });
    this.dbConnect = await createConnection(
      Object.assign({
        name: 'default',
        type: 'better-sqlite3',
        database: ':memory:',
        entities: ['src/infra/database-adapters/typeorm-adapters/typeorm-entities/*.ts'],
        synchronize: true,
      })
    );

    // this.dbConnect.connect();
  }

  teardownTestDB() {
    this.dbConnect.close();
    this.testdb.close();
  }

}