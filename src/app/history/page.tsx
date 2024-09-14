'use client';
import Link from 'next/link';
import style from './History.module.scss';
import styleLink from '../../app/page.module.css';
import { HistoryItem, useHistory } from '@/hooks/useHistory';
import { useTranslations } from 'next-intl';
import { dateToUnixEpoch } from '@/utils/ConvertStringsDates';

export default function History() {
  const { requests } = useHistory();
  const t = useTranslations('History');

  const request = requests.sort(
    (a: HistoryItem, b: HistoryItem) => dateToUnixEpoch(b.date) - dateToUnixEpoch(a.date),
  );

  return (
    <section className={style.wrapper}>
      {request.length && (
        <>
          <h1>{t('history requests')}</h1>
          <div className={style.table}>
            {requests.map((item, index) => (
              <li key={index}>
                <div className={style.row}>
                  <div>
                    <div>{item.method}</div>
                    <div className={style.dateformat}>
                      {item.date.toLocaleString('en-GB').slice(0, -5)}
                    </div>
                  </div>
                  <div className={style.url}>
                    <Link href={item.urlBase64} className={style.signIn}>
                      {item.url}
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </>
      )}
      {!requests.length && (
        <>
          <div className={style.norequest}>
            <p>{`You haven't executed any requests yet.`}</p>
            <p>{`It's empty here. Try those options`}</p>
          </div>
          <div className={styleLink.containerLink}>
            <Link href={'/GET'} className={styleLink.signIn}>
              RESTfull
            </Link>
            <Link href={'/graphiql'} className={styleLink.signIn}>
              GraphiQL
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
