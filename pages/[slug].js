import styles from '../app/page.module.css'
import {getAllPages, getAllPosts, getFlexContentPage, getSinglePage} from '../app/api/data';

export default function Page({ page, posts }) {
  console.log('page ', page)
  return (
    <div className={styles.main}>
      <div className={styles.description}>
        <h1>{page.page.title}</h1>
        <p>{page.page.message.message}</p>
      </div>
      <ul>
        {
          posts.posts.nodes?.map((post) => {
            return (
                <li key={post.slug}>
                  <a href={`blog/${post.slug}`}>{post.title}</a>
                </li>
            );
          })
        }
      </ul>
    </div>
  )
}

export async function getStaticPaths() {
  const allPages = await getAllPages();
  const paths = allPages?.pages?.nodes?.map(page => ({
    params: { slug: page.slug }, // Ensure `post.slug` is the correct property
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const page = await getSinglePage(params.slug);
  const allPosts = await getAllPosts();
  // const flexContent = await getFlexContentPage();

  return {
    props: { page: page, posts: allPosts },
    revalidate: 10,
  }
}
