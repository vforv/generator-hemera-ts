import { Service } from 'justinject';
import * as replaceOnce from 'replace-once';
export const DB_NAME: string = '<%= nameWithPrefix %>-db';
export const STORE: string = `mongo-store.${DB_NAME}`;
export const COLLECTION: string = '<%= serviceName %>';

@Service()
export class MongoService {
    public mongoHost: any;

    public connectionString(): string {
        const str: any = process.env.<%= prefixConst %>_MONGO_CLUSTER;

        const find = ['PASSWORD', 'USERNAME', 'DATABASE'];
        const replace = [process.env.<%= prefixConst %>_MONGO_CLUSTER_PASSWORD, process.env.<%= prefixConst %>_MONGO_CLUSTER_USER, DB_NAME];

        this.mongoHost = replaceOnce(str, find, replace, 'gi');

        return this.mongoHost;
    }
}
