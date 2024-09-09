'use client';
import NotFound from '@/app/not-found';
import RestClient from '@/components/restClient/RestClient';
import { decodeBase64 } from '@/services/createUrl';
import { useParams } from 'next/navigation';

export default function RESTfull() {
  const params = useParams();
  const method = params.method;

  let url = '';
  if (Array.isArray(params.optionalCatchAllSegment)) {
    url = decodeBase64(params.optionalCatchAllSegment[0]);
  } else if (typeof params.url === 'string') {
    url = decodeBase64(params.optionalCatchAllSegment);
  }

  if (
    method !== 'GET' &&
    method !== 'POST' &&
    method !== 'PUT' &&
    method !== 'DELETE' &&
    method !== 'PATCH' &&
    method !== 'OPTIONS' &&
    method !== 'HEAD' &&
    method !== 'graphiql' &&
    method !== 'history'
  ) {
    return NotFound();
  } else {
    return <RestClient method={method} currentURL={url} />;
  }
}
