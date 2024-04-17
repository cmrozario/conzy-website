<script>
    import * as d3 from "d3";

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    export let colors 
    export let selectedIndex;


    export let data = [];
    let wedges = {};
    let oldData = [];
    let transitionDuration = 1000;

    let pieData;
    let arcs;
    let arcData;
    $: {
      // pieData = data.map(d => ({...d}));
      oldData = pieData
      pieData = d3.sort(data, d=> d.label);
      arcData = sliceGenerator(pieData);
      arcs = arcData.map((d) => arcGenerator(d));
      pieData = pieData.map((d, i) => ({...d, ...arcData[i], arc: arcs[i]}));
      transitionArcs()
    };


  let sliceGenerator = d3.pie().value(d => d.value).sort(null);

  function transitionArcs() {
    let wedgeElements = Object.values(wedges);    
    d3.selectAll(wedgeElements).transition("arc")
        .duration(transitionDuration)
        .styleTween("d", function(_, index) {
          let wedge = this;
          let label = Object.keys(wedges)[index];
          let transition = transitionArc(wedge, label);
          return transition?.interpolator;
        });
  }

  function getEmptyArc (label, data = pieData) {
    // Union of old and new labels in the order they appear
    let labels = d3.sort(new Set([...oldData, ...pieData].map(d => d.label)));
    let labelIndex = labels.indexOf(label);
    let sibling;
    for (let i = labelIndex - 1; i >= 0; i--) {
      sibling = data.find(d => d.label === labels[i]);
      if (sibling) {
        break;
      }
    }
    let angle = sibling?.endAngle ?? 0;
    return {startAngle: angle, endAngle: angle};
  }

  function arc (wedge) {
    let transition = transitionArc(wedge);
    // Calculations that will only be done once per element go here
    if (!transition)
      return;
    return {
      duration: transitionDuration,
      css: (t, u) => {
        `d: ${transition.interpolator(transition.type === "out" ? u : t)} easing:d3.easeCubic`
      }
    }
}

function transitionArc (wedge, label) {
	label ??= Object.entries(wedges).find(([label, w]) => w === wedge)[0];
  let d = pieData.find(d => d.label === label);
  let d_old = oldData.find(d => d.label === label);

  if (!d || !d_old) {
      return;
  }
  let from = d_old ? {...d_old} : getEmptyArc(label, oldData);
  let to = d ? { ...d }: getEmptyArc(label, data);  
  let angleInterpolator = d3.interpolate(from, to);  
  let interpolator = t => `path("${arcGenerator(angleInterpolator(t))}")`;

  if (sameArc(d_old, d)) {
                return null;
              }
  let type = d ? d_old ? "update" : "in" : "out";
  return {d, d_old, from, to, interpolator, type};
}


function sameArc(d_old, d) {
    if (!d_old || !d) {
        return !d_old && !d;
    }    
    return d_old.startAngle === d.startAngle && d_old.endAngle === d.endAngle;
}

</script>








<div class = "container">

<svg viewBox="-50 -50 100 100">


  {#each pieData as d, index (d.label)}
    <path d={d.arc} fill={ colors(d.id ?? d.label)} bind:this={ wedges[d.label] }  transition:arc/>
  {/each}


</svg>





<ul class="legend">
    {#each pieData as d, index}
    <li class:selected = {selectedIndex === index} style="--color: { colors(d.label) }">
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
  transition: 300ms;
  transition-property: transform, opacity, fill;
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