
<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/project.svelte";
    import Pie from "$lib/Pie.svelte"
    import * as d3 from "d3";

    let query = "";       

    let filteredProjects;

    $: filteredProjects = projects.filter((project) => {
        let values = Object.values(project).join("\n").toLowerCase();
        return values.includes(query.toLowerCase());
        });


    let pieData;
    $: {
        pieData = {};
        let rolledData = d3.rollups(
            filteredProjects,
            (v) => v.length,
            (d) => d.year
            );
        pieData = rolledData.map(([year, count]) => {
            return { value: count, label: year };
            });

    }

    let selectedYearIndex = -1;
    let selectedYear;
    $: selectedYear = selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;


    // let filteredByYear;
    // $: filteredByYear = projects.filter((project) => {
    //     let values = Object.values(project).join("\n").toLowerCase();
    //     return values.includes(query.toLowerCase());

    //     if (selectedYear) {
    //         return  project.year === selectedYear;
    //     }

    //     return true;
    //     });

    let filteredByYear;
    $: filteredByYear = projects.filter((project) => {
        let values = Object.values(project).join("\n").toLowerCase();
        let selectedValues = values.includes(query.toLowerCase());

        if (selectedYear) {
            return selectedValues && project.year === selectedYear;
        }

        return selectedValues;
    });


</script>


<svelte:head>
	<title>My projects</title>
</svelte:head>


<h1>
    Projects
</h1>

<Pie data="{pieData}" bind:selectedIndex="{selectedYearIndex}" />


<input
  type="search"
  bind:value="{query}"
  aria-label="Search projects"
  placeholder="🔍 Search projects…"
/>

<h1> 

</h1>

<div class="projects">
    {#each filteredByYear as p}
    <Project info={p} />
    {/each}
   
</div>



<style>

</style>