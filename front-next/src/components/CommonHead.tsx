import Head from 'next/head';

interface CommonHeadProps {
  title: string;
}

function CommonHead({ title }: CommonHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <link rel='icon' href='/favicon.png' />
    </Head>
  );
}

export default CommonHead;
