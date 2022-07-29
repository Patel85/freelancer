import "@assets/main.css";
import "@assets/chrome-bug.css";
import "../styles/toast.css";

import { Provider } from "react-redux";
import { store } from "@redux/store";
import Layout from "@components/layouts";
import setupInterceptors from "@services/setupInterceptors";

function MyApp({ Component, pageProps }) {
  setupInterceptors(store);

  return (
    <Provider store={store}>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
