'use client';

import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { LayoutProps } from '@/types/layout';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import style from '@/components/mainLayout/MainLayout.module.scss';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <div className={style.wrapper}>
          <Header />
          <div className={style.contact}>{children}</div>
          <Footer />
        </div>
      </Provider>
    </>
  );
};
