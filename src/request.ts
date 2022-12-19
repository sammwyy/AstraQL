export interface GraphQLRequest {
  body: string;
  type: 'query' | 'mutation';
  variables?: Record<string, any>;
}
