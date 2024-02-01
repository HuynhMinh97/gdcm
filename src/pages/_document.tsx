import { Html, Head, Main, NextScript } from 'next/document';
import Document from 'next/document';

export default class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
