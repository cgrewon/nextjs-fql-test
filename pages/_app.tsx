import "bootstrap/dist/css/bootstrap.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import "../styles/globals.scss";

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { EventProvider } from "../context/EventContext";

import client from "../gql/apollo-client";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
console.error = ()=>{};
console.log = ()=>{};
console.warn = ()=>{};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <ApolloProvider client={client}>
          <EventProvider>
            <Component {...pageProps} />
          </EventProvider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
