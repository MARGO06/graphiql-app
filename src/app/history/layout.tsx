import style from './History.module.scss';
export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return <section className={style.wrapper}>{children}</section>;
}
