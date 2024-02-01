import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '@/redux/store';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import createEmotionCache from '@/utils/createEmotionCache';
const Provider = dynamic(() => import('react-redux').then(m => m.Provider), {
  ssr: false
});
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
interface EmotionCache {
  inserted: {
    [key: string]: string | true;
  };
  sheet: StyleSheet;
  key: string;
  compat?: true;
  nonce?: string;
  insert(
    selector: string,
    sheet: StyleSheet,
    shouldCache: boolean
  ): string | void;
}
const clientSideEmotionCache = createEmotionCache();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};
const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const getLayout = (page: ReactElement) => page;
  return (
    <Provider store={store}>
      {getLayout(<Component {...props.pageProps} />)}
    </Provider>
  );
};

export default App;
