import { ReactNode } from 'react';
import AppHeader from '@/components/AppHeader/AppHeader';
import st from './AppLayout.module.css';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <AppHeader />
      <main className={st.main}>{children}</main>
    </>
  );
};

export default AppLayout;