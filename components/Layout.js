import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      {/*  */}
      <div className=''>{children}</div>
      {/*  */}
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'Exhifairs | Connecting Researchers, Building Communities',
  description:
    'Get upcoming details of conferences, events, seminars & workshops in India',
  keywords: 'conferences, events, seminars, workshops',
};
