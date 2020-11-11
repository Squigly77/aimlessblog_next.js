import Layout from "../../components/layout";
import { getAllPostIds,getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import Link from "next/link";
import utilStyles from "../../styles/utils.module.css";
import "highlight.js/styles/dracula.css";
import Social from "../../components/social"
import AdSense from "react-adsense";

export default function Post({ postData }) {
  const tags = postData.tag
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div>
          <div className={utilStyles.taglist}>Tag:</div>
          {!Array.isArray(tags) ? (
            <Link href={`/tags/${encodeURIComponent(postData.tag)}`}>
              <a className={utilStyles.taglist}>{postData.tag}</a>
            </Link>
          ) : (
            tags.map((tag) => (
              <Link href={`/tags/${encodeURIComponent(tag)}`}>
                <a className={utilStyles.taglist}>{tag}</a>
              </Link>
            ))
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <Social slug={postData.slug} title={postData.title} />
      <AdSense.Google
        client="ca-pub-7292810486004926"
        slot="7806394673"
        style={{ display: "block" }}
        format="auto"
        responsive="true"
        layoutKey="-gw-1+2a-9x+5c"
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}