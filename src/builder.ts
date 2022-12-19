import { GraphQLRequest } from './request';

function buildRequest(
  type: 'query' | 'mutation',
  body: TemplateStringsArray | string,
): GraphQLRequest {
  const asStr = Array.isArray(body) ? body.join(' ') : (body as string);

  return {
    type,
    body: asStr,
  };
}

export function query(body: TemplateStringsArray | string): GraphQLRequest {
  return buildRequest('query', body);
}

export function mutation(body: TemplateStringsArray): GraphQLRequest {
  return buildRequest('mutation', body);
}
