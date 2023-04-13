import pgPromise from "pg-promise";
import Connection from "./Connection";

export default class PostgreSQLConnectionAdapter implements Connection {
    connection: any;

    constructor() {
        this.connection = pgPromise()("LINKACCESS")
    }

    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }

    async close(): Promise<void> {
		await this.connection.$pool.end();
	}
}