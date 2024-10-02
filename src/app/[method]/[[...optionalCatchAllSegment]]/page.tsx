'use client';
import NotFound from '@/app/not-found';
import RestClient from '@/components/restClient/RestClient';
import { decodeBase64 } from '@/services/createUrl';
import { useParams, useSearchParams } from 'next/navigation';

const clientsMethods = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'OPTIONS',
  'HEAD',
  'graphiql',
  'history',
];

export default function RESTfull() {
  const params = useParams();
  const searchParams = useSearchParams();

  const method = String(params.method);

  let url = '';
  let body = '';

  if (Array.isArray(params.optionalCatchAllSegment)) {
    url = decodeBase64(params.optionalCatchAllSegment[0]);
    body = decodeBase64(params.optionalCatchAllSegment[1]);
  } else if (typeof params.url === 'string') {
    url = decodeBase64(params.optionalCatchAllSegment);
  }

  const queryParams: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  if (clientsMethods.includes(method)) {
    return (
      <RestClient method={method} currentURL={url} currentBody={body} queryParams={queryParams} />
    );
  } else {
    return NotFound();
  }
}
