const USERNAME = "Tygo-van-den-Hurk";

/** The query for GitHubs GraphQL API. */
const GRAPHQL_QUERY = `query {
  user(login: "${USERNAME}") {
    avatarUrl
    pinnedItems(first: 6, types: [REPOSITORY]) {
      nodes {
        ... on Repository {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          owner {
            login
            avatarUrl
          }
        }
      }
    }
  }
}`;

/**
 * Gets the 6 pinned repositories and the information regarding it.
 * @returns { Promise<List<Object>> } the list of repositories.
 */
export async function getPinnedRepositories(): Promise<Object> {    
    
    if (! process.env.GITHUB_TOKEN) throw new Error("env var GITHUB_TOKEN is not truthy.");

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query: GRAPHQL_QUERY }),
    });

    const data = await response.json();

    if (data.errors) throw new Error(data.errors);

    return data.data.user.pinnedItems.nodes; 
}