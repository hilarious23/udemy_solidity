import React from 'react';
import { Container } from 'semantic-ui-react';
//  getting link tag from Layout's Component into the html head tag
import Head from 'next/head';
import Header from './Header';

export default props => {
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
        />
      </Head>

      <Header />
      {props.children}
    </Container>
  );
};
