import Connection from "./Connection";
import pgp from "pg-promise";

export default class PgPromiseConnection implements Connection {
    pgp: any;

    constructor() {
        this.pgp = pgp()("postgres://dev1:dev1@localhost:5432/todo")
    }

    query(statement: string, params: any[]): Promise<any> {
        return this.pgp.query(statement, params);
    }
    close(): Promise<void> {
        return this.pgp.$pool.end();
    }

}