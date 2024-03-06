<svelte:head>
	<title>Home</title>
</svelte:head>

<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/project.svelte";
  </script>

<h1>
    Conzy
</h1>
<p>
    Hello, I am a 21 year old senior studying Math and AI at MIT. I love playing volleyball, with my dog (DJ), sometimes with Colin Weaver, and sometimes with my brother (Chris). 
</p>

<h4>
    A couple of recent projects:
</h4>
<div class="projects">
    {#each projects.slice(0,3) as p}
    <Project info={p} />
    {/each}
   
</div>

<img src = "images/IMG_2430.jpg" alt = "a VERY cute picture of my dog DJ" width = "200">
<img src = "images/IMG_3672.jpg" alt = "a picture of me and my brother at his first volleyball tournament" width = "200" >
<img src = "images/IMG_2608.jpg" alt = "a picture of Colin Weaver, my boyfriend of 3 years" width = "200" >
<img src = "images/MIT Womens Volleyball 2022 NCAA Sweet 16 (Tufts)-1110_Original.jpg" alt = "a picture of me playing volleyball at Tufts university" width = "300">

