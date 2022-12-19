import unfetch from 'isomorphic-unfetch';
import md5 from 'md5';

import { CacheLoader } from './cache';
import { IDictionary } from './dictionary';
import { GraphQLRequest } from './request';

interface GQLClientSettings {
  cache?: CacheLoader;
  endpoint: string;
  headers?: IDictionary;
}

export class GraphQLClient {
  private cache: CacheLoader | undefined;
  private endpoint: string;
  private headers: IDictionary;

  constructor(settings: GQLClientSettings) {
    this.cache = settings.cache;
    this.endpoint = settings.endpoint;
    this.headers = settings.headers ? settings.headers : {};
  }

  public addHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  public removeHeader(key: string) {
    delete this.headers[key];
  }

  public setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
  }

  private async _getCachedFetch(
    request: GraphQLRequest,
    variables?: IDictionary,
  ): Promise<IDictionary | null> {
    if (!this.cache) return null;

    const rawId = request.type + request.body + JSON.stringify(variables);
    const id = md5(rawId);
    const data = await this.cache.get(id);
    return data ? JSON.parse(data) : null;
  }

  private async _saveResponseToCache(
    request: GraphQLRequest,
    variables: IDictionary,
    response: IDictionary,
  ): Promise<void> {
    if (!this.cache) return;

    const rawId = request.type + request.body + JSON.stringify(variables);
    const id = md5(rawId);
    await this.cache.save(id, JSON.stringify(response));
  }

  private async _fetch(
    request: GraphQLRequest,
    variables?: IDictionary,
  ): Promise<IDictionary> {
    const copyRequest = {} as IDictionary;
    copyRequest[request.type] = request.body;
    copyRequest.variables = request.variables || variables;

    const req = await unfetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...this.headers,
      },
      body: JSON.stringify(copyRequest),
    });

    const res = await req.json();
    await this._saveResponseToCache(request, variables || {}, res);
    return res;
  }

  public async fetch(
    request: GraphQLRequest,
    variables?: IDictionary,
  ): Promise<IDictionary> {
    if (!request.body.startsWith(request.type)) {
      request.body = `${request.type} ${request.body}`;
    }

    let res = await this._getCachedFetch(request, variables);
    if (!res) res = await this._fetch(request, variables);

    const { data, errors, error } = res;

    if (data) {
      for (const key in data) {
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

  free() {
    this.cache?.deleteAll();
  }
}
