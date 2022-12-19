import { IDictionary } from './dictionary';

export interface GraphQLRequest {
  body: string;
  type: 'query' | 'mutation';
  variables?: IDictionary;
}
