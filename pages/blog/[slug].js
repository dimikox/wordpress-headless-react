import {getAllPosts, getSinglePost} from "../../app/api/data";
import styles from "../../app/page.module.css";

export default function Blog({ post }) {

    console.log('post ', post)
    return (
        <div>
            <div>
                <h1>{post.post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.post.content }} />
            </div>
            <div>
                {
                    post?.post?.gallery?.gallery?.map((image) => {
                        return (
                            <img className={styles.img} key={image.id} src={image.mediaItemUrl} alt="image"/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const allPosts = await getAllPosts();
    const paths = allPosts.posts.nodes.map(post => ({
        params: { slug: post.slug }, // Ensure `post.slug` is the correct property
    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const post = await getSinglePost(params.slug); // Use the slug to fetch post data
    return {
        props: { post },
        revalidate: 10, // Optional: Number of seconds after which a page re-generation can occur
    };
}

