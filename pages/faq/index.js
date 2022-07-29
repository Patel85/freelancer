import React from "react";
import SingleComponent from "@components/layouts/SingleComponent";
import FaqData from "@components/faq/faqdata";
import Head from "next/head";

const Faq = () => {
  return (
    <section className="mb-20 w-full">
      <Head>
        <title>FAQ - Statsout</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <SingleComponent margin="small" heading="Frequently Asked Questions">
        <div className="max-w-lg w-full">
          <FaqData
            title="How many graphs per dashboard?"
            description="Twenty."
          />
          <FaqData
            title="How often is the dashboard updated?"
            description="That depends on the platform and metric. e.g. Google Analytics stats are updated every hour. The latest Google Search Console data is only available after two days so it's updated once a day."
          />
          <FaqData
            title="How is my data secured?"
            description="We use Google's Firebase for data storage and authentication. We store only the metrics that are displayed on your dashboard. We do not share them with anyone. We do not use them for analytics. All access tokens granted to Statsout from signing in with other platforms (e.g. Google, Facebook) are read-only and can only be used with Statsout's private key."
          />
          <FaqData
            title="What happens to my stats when my Statsout account expires?"
            description="Nothing. Statsout only reads your data from other platforms and has no way of modifying it. After your account expires you can simply renew it and all your stats will be displayed again."
          />
          <FaqData
            title="What happens when I delete my Statsout account?"
            description="We remove all data associated with your account from our database, including all access tokens granted to Statsout to read your data from other platforms."
          />
          <FaqData
            title="Can I share access to my dashboard with other people?"
            description="Not yet."
          />
          <FaqData
            title="Is there an API to read my neatly assembled stats?"
            description="Not yet."
          />
        </div>
      </SingleComponent>
    </section>
  );
};

export default Faq;
