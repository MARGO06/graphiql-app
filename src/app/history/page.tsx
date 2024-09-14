'use client';
import Link from 'next/link';
import style from './History.module.scss';
import styleLink from '../../app/page.module.css';
import { useHistory } from '@/hooks/useHistory';
import { useTranslations } from 'next-intl';

export default function History() {
  const { requests } = useHistory();
  const t = useTranslations('History');

  return (
    <section className={style.wrapper}>
      {requests.length && (
        <>
          <h1>{t('history requests')}</h1>
          <div className={style.table}>
            {requests.map((item, index) => (
              <li key={index}>
                <div className={style.row}>
                  <div>
                    <div>{item.method}</div>
                    <div>Time</div>
                  </div>
                  <div className={style.url}>
                    <Link href={`/${item.method}/${item.urlBase64}`} className={style.signIn}>
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
