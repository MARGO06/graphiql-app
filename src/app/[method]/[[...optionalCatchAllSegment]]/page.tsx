'use client';
import NotFound from '@/app/not-found';
import RestClient from '@/components/restClient/RestClient';
import { decodeBase64 } from '@/services/createUrl';
import { useParams } from 'next/navigation';

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
  const method = params.method as string;

  let url = '';
  if (Array.isArray(params.optionalCatchAllSegment)) {
    url = decodeBase64(params.optionalCatchAllSegment[0]);
  } else if (typeof params.url === 'string') {
    url = decodeBase64(params.optionalCatchAllSegment);
  }

  if (clientsMethods.includes(method)) {
    return <RestClient method={method} currentURL={url} />;
  } else {
    return NotFound();
  }
}
