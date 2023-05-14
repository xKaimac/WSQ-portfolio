import Document, { Head, Html, Main, NextScript } from 'next/document'
    import { ServerStyleSheet } from 'styled-components'

    export default class MyDocument extends Document {
      render() {
        return (
          <Html lang="en">
            <Head>
            <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          <link rel="android-chrome-icon-192x192" sizes="180x180" href="/images/android-chrome-icon-192x192.png" />
          <link rel="android-chrome-icon-512x512" sizes="180x180" href="/images/android-chrome-icon-512x512.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
          <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        )
      }

      static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
          ctx.renderPage = () =>
            originalRenderPage({
              enhanceApp: (App) => (props) =>
                sheet.collectStyles(<App {...props} />),
            })

          const initialProps = await Document.getInitialProps(ctx)
          return {
            ...initialProps,
            styles: (
              <>
                {initialProps.styles}
                {sheet.getStyleElement()}
              </>
            ),
          }
        } finally {
          sheet.seal()
        }
      }
    }