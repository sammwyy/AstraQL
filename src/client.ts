import unfetch from 'isomorphic-unfetch';
import { GraphQLRequest } from './request';

interface GQLClientSettings {
  endpoint: string;
  headers?: Record<string, any>;
}

export class GraphQLClient {
  private endpoint: string;
  private headers: Record<string, any>;

  constructor(settings: GQLClientSettings) {
    this.endpoint = settings.endpoint;
    this.headers = settings.headers ? settings.headers : {};
  }

  public addHeader(key: string, value: any) {
    this.headers[key] = value;
  }

  public removeHeader(key: string) {
    delete this.headers[key];
  }

  public setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
  }

  public async fetch(
    request: GraphQLRequest,
    variables?: Record<string, any>,
  ): Promise<Record<string, any>> {
    if (!request.body.startsWith(request.type)) {
      request.body = `${request.type} ${request.body}`;
    }

    const copyRequest = {} as Record<string, any>;
    copyRequest[request.type] = request.body;
    copyRequest.variables = request.variables || variables;

    const res = await unfetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...this.headers,
      },
      body: JSON.stringify(copyRequest),
    });

    const { data, errors, error } = await res.json();

    if (data) {
      for (let key in data) {
        return data[key];
      }
    }

    throw new Error(
      (errors && errors[0]?.message) ||
        errors ||
        error?.messages[0] ||
        error?.message ||
        error,
    );
  }
}
