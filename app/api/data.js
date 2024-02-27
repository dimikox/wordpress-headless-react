async function fetchAPI(query) {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
    });

    const json = await res.json();

    if (json.errors) {
        console.error(json.errors);
        throw new Error('Failed to fetch API');
    }
    return json.data;
}

export async function getAllPosts() {
    const data = await fetchAPI(`
    {
      posts {
        nodes {
          title
          uri
          slug
          content
          subtitle {
            subtitle
          }
          gallery {
            gallery {
              id
              mediaItemUrl
            }
          }
        }
      }
    }
  `);
    return data;
}

export async function getSinglePost(slug) {
    const data = await fetchAPI(`
    {
      post( id: "${slug}", idType: SLUG ) {
        id
        databaseId
        title
        slug
        content
        subtitle {
            subtitle
        }
        gallery {
            gallery {
              id
              mediaItemUrl
            }
        }
      }
    }
  `);
    return data;
}

export async function getAllPages() {
    const data = await fetchAPI(`
    {
      pages {
        nodes {
          title
          id
          uri
          slug
        }
      }
    }
  `);
    return data;
}

export async function getSinglePage(slug) {
    const data = await fetchAPI(`
    {
      page( id: "${slug}", idType: URI ) {
        title
        id
        uri
        slug
        content
        message {
          message
        }
        testElements {
            elements {
                __typename
            ... on Page_Testelements_Elements_One {
                    one
                }
            ... on Page_Testelements_Elements_Two {
                    two {
                        mediaItemUrl
                    }
                }
            }
        }
      }
    }
  `);
    return data;
}

// query for flex content ACF
export async function getFlexContentPage() {
    const data = await fetchAPI(`
    {
      pages {
        nodes {
            title
            id
            uri
            slug
            testElements {
                elements {
                    __typename
                ... on Page_Testelements_Elements_One {
                        one
                    }
                ... on Page_Testelements_Elements_Two {
                        two {
                            mediaItemUrl
                        }
                    }
                }
            }
        }
      }   
    }
  `);
    return data;
}

