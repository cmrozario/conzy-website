<script>
    import * as d3 from "d3";
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    let colors = d3.scaleOrdinal(d3.schemeTableau10);

    export let data = [];

    let sliceGenerator = d3.pie().value((d) => d.value);
    let arcData; 
    $: arcData = sliceGenerator(data);
    let arcs;
    $: arcs = arcData.map((d) => arcGenerator(d));

    //selectedIndex = selectedIndex === index ? -1 : index;
    export let selectedIndex;




</script>

<div class = "container">

<svg viewBox="-50 -50 100 100">

    {#each arcs as arc, index} 
        <path d={arc} fill={ colors(index) }  class:selected={selectedIndex === index} on:click={e => selectedIndex = selectedIndex === index ? -1 : index}/> 
    {/each}


</svg>





<ul class="legend">
    {#each data as d, index}
    <li class:selected = {selectedIndex === index} style="--color: { colors(index) }">
        <span class="swatch"></span>
        {d.label} <em>({d.value})</em>
    </li>
    {/each}
</ul>
    
</div>

<style>

.selected {
  --color: oklch(30.1% 0.125 273.53) !important;

  &:is(path) {
    fill: var(--color);
  }
}

svg:has(path:hover) {
    path:not(:hover) {
      opacity: 50%;
    }
  }

path {
  transition: 500ms;
}

.container {
    display: flex; /* Use flex layout for the container */
    align-items: center; /* Vertically center the content */
    gap: 20px; /* Add spacing between the pie chart and the legend */
}

.legend {
    flex:1;
    list-style-type: none; /* Remove default list styles */
    padding: 10px; /* Add spacing inside the legend */
    margin: 20px; /* Add spacing around the legend */
    border: 1px solid #ccc; /* Add border around the legend */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(7em, 1fr)); /* Auto-fill grid template */
    gap: 10px; /* Add spacing between grid items */
}

.legend li {
    display: flex; /* Apply flex display to each list item */
    align-items: center; /* Vertically center align the content */
    gap: 10px; /* Add spacing between swatch and text */
}

.legend li .swatch {
    display: inline-block;
    width: 20px; /* Adjust the width and height as needed */
    height: 20px;
    background-color: var(--color); /* Use the color variable */
    border-radius: 50%; /* Make it a full circle */
}




  svg {
    max-width: 20em;
    margin-block: 2em;
  
    /* Do not clip shapes outside the viewBox */
    overflow: visible;
  }

</style>