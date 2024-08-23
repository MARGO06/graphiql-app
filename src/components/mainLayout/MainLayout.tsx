import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { LayoutProps } from '@/types/layout';
import style from './MainLayout.module.scss';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className={style.wrapper}>
        <Header />
        <div className={style.contact}>{children}</div>
        <Footer />
      </div>
    </>
  );
};
