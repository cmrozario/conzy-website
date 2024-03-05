
<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
  </script>


<svelte:head>
	<title>My projects</title>
</svelte:head>


<h1>
    Projects
</h1>
<div class="projects">
    {#each projects as p}
    <Project info={p} />
    {/each}
   
</div>


<style>
    .projects{
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
}

article{
	display:grid;
	grid-template-rows: subgrid;
	grid-row: span 3;
	h2{
		margin:0;
	}

}
</style>