import { StringSchema } from 'nats-hemera';

export interface I<%= serviceCC %>Model {
    id?: StringSchema;
    name: StringSchema;
}

export interface ID {
    id: StringSchema;
}
