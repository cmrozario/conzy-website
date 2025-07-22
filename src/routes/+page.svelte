<script>
  import blogs from '$lib/blogs.json';
  import BlogEntry from '$lib/BlogEntry.svelte';

  let githubData = fetch("https://api.github.com/users/cmrozario");
</script>

<svelte:head>
  <title>Conzy and Colin's Travel Blog</title>
</svelte:head>

<div class="layout">
  <aside class="sidebar">
    <h1>🌍 Travel Blog</h1>
    <nav>
      <ul>
        {#each blogs as blog}
          <li><a href={`#${blog.title.replace(/\s+/g, '-')}`}>{blog.title}</a></li>
        {/each}
      </ul>
    </nav>
  </aside>

  <main class="content">
    <section class="intro">
      <h2>Conzy and Colin's travel blog</h2>
    </section>

    {#each blogs as blog}
      <section id={blog.title.replace(/\s+/g, '-')} class="blog-section">
        <BlogEntry {...blog} />
      </section>
    {/each}

    {#await githubData}
      <p>Loading GitHub info...</p>
    {:then response}
      {#await response.json()}
        <section class="github-stats">
          <h2>My GitHub Stats</h2>
          <dl>
            <dt>Followers</dt><dd>{data.followers}</dd>
            <dt>Following</dt><dd>{data.following}</dd>
            <dt>Public Repos</dt><dd>{data.public_repos}</dd>
          </dl>
        </section>
      {:catch err}
        <p>Error: {err.message}</p>
      {/await}
    {:catch error}
      <p>Error: {error.message}</p>
    {/await}
  </main>
</div>

<style>
  /* Layout */
  .layout {
    display: flex;
    font-family: system-ui, sans-serif;
    background-color: #f9f9f9;
  }

  /* Sidebar */
  .sidebar {
    width: 180px;
    background-color: #ffffff;
    padding: 1rem;
    border-right: 1px solid #ddd;
    position: sticky;
    top: 0;
    height: 100vh;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  }

  .sidebar h1 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #333;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar li {
    margin-bottom: 0.5rem;
  }

  .sidebar a {
    text-decoration: none;
    color: #0077cc;
    font-size: 0.9rem;
  }

  .sidebar a:hover {
    text-decoration: underline;
  }

  /* Main Content */
  .content {
    flex: 1;
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .intro {
    margin-bottom: 2rem;
  }

  .blog-section {
    margin-bottom: 2.5rem;
  }

  .github-stats {
    margin-top: 3rem;
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }

  .github-stats dl {
    display: grid;
    grid-template-columns: max-content auto;
    row-gap: 0.5rem;
    column-gap: 1rem;
  }

  h1, h2, h3 {
    color: #333;
  }
</style>
