import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import React, { useState } from "react";
import Page from "../components/page";

const perPage = 10;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData: allPostsData
    },
  };
}

export default function Home({allPostsData}) {
  const [pageIndex, setPageIndex] = useState(1);
  const total = allPostsData.length
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className={utilStyles.headsub}>
          Webアプリ制作やWebサービスの覚え書きブログ
        </p>
        <p>
          <Link href="/tags">
            <a>Tag</a>
          </Link>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData
            .slice(pageIndex * perPage - 10, pageIndex * perPage)
            .map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small><br />
                <Link href="/posts/[id]" as={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
              </li>
            ))}
        </ul>
        <Page total={total} setPageIndex={setPageIndex} pageIndex={pageIndex} />
      </section>
    </Layout>
  );
}
