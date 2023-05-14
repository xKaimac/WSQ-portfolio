import Head from 'next/head';

export function CustomHead({ title, description, keywords }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
    </>
  );
}
