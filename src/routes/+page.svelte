<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/project.svelte";
    console.log(projects)
</script>



<svelte:head>
	<title>Home</title>
</svelte:head>


<h1>
    Conzy
</h1>
<p>
    Hello, I am a 21 year old senior studying Math and AI at MIT. I love playing volleyball, with my dog (DJ), sometimes with Colin Weaver, and sometimes with my brother (Chris). 
</p>

<h2>
    A couple of recent projects:
</h2>
<div class="projects">
    {#each projects.slice(0,3) as p(p.title)}
    <Project info={p} hLevel=3 />
    {/each}
   
</div>

<img src = "images/IMG_2430.jpg" alt = "a VERY cute picture of my dog DJ" width = "200">
<img src = "images/IMG_3672.jpg" alt = "a picture of me and my brother at his first volleyball tournament" width = "200" >
<img src = "images/IMG_2608.jpg" alt = "a picture of Colin Weaver, my boyfriend of 3 years" width = "200" >
<img src = "images/MIT Womens Volleyball 2022 NCAA Sweet 16 (Tufts)-1110_Original.jpg" alt = "a picture of me playing volleyball at Tufts university" width = "300">


<style>
    dl {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    }

    dt {
    grid-row: 1;
    }

    dd {
    grid-row: 2;
    }

</style>


{#await fetch("https://api.github.com/users/cmrozario") }
	<p>Loading...</p>
{:then response}
	{#await response.json()}
		<p>Decoding...</p>
	{:then data}
        <section>
            <h2>My GitHub stats</h2>
            <dl>
                <dt>Followers</dt>
                <dd>{data.followers}</dd>
                <dt>Following</dt>
                <dd>{data.following}</dd>
                <dt>Public Repos</dt>
                <dd>{data.public_repos}</dd>
            </dl>
        </section>
	{:catch error}
		<p class="error">
			Something went wrong: {error.message}
		</p>
	{/await}
{:catch error}
	<p class="error">
		Something went wrong: {error.message}
	</p>
{/await}
