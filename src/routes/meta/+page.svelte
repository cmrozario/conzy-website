<script>
    import * as d3 from "d3";
    import Pie from "$lib/Pie.svelte";
    import FileLines from "./FileLines.svelte";
    import { onMount } from "svelte";
    import {
        computePosition,
        autoPlacement,
        offset,
    } from '@floating-ui/dom';
    import Scrolly from "svelte-scrolly";



    let data = [];
    let commits = [];
    let commitTooltip;
    let tooltipPosition = {x: 0, y: 0};

    let colors = d3.scaleOrdinal(d3.schemeTableau10);



    let cursor = {x: 0, y: 0};  

    let xAxis, yAxis;
    let width = 1000, height = 600;
    let margin = {top: 10, right: 10, bottom: 30, left: 20};
    let myProgressVariable;




    onMount(async () => {
        data = await d3.csv("loc.csv", row => ({
            ...row,
            line: Number(row.line), // or just +row.line
            depth: Number(row.depth),
            length: Number(row.length),
            date: new Date(row.date + "T00:00" + row.timezone),
            datetime: new Date(row.datetime)
        }));

        commits = d3.groups(data, d => d.commit).map(([commit, lines]) => {
        let first = lines[0];
        let {author, date, time, timezone, datetime} = first;
        let ret = {
            id: commit,
            url: "https://github.com/vis-society/lab-7/commit/" + commit,
            author, date, time, timezone, datetime,
            hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
            totalLines: lines.length
        };

        Object.defineProperty(ret, "lines", {
            value: lines,
            configurable: true,
            writable: true,
            enumerable: false,
        });

        return ret;
        });
    });

    let commitProgress = 100;
    $: timeScale = d3.scaleTime().domain(d3.extent(commits, commit => (commit.datetime))).range([0,100])
    $: commitMaxTime = timeScale.invert(commitProgress)



    let raceProgess = 100;
    $: racetimeScale = d3.scaleTime().domain(d3.extent(commits, commit => (commit.datetime))).range([0,100])
    $: raceMaxTime = racetimeScale.invert(raceProgess)
    
    $: racefilteredCommits = commits.filter((commit) => commit.datetime <= raceMaxTime )
    $: racefilteredLines = data.filter((d) => d.datetime <= raceMaxTime )





        

    $: filteredCommits = commits.filter((commit) => commit.datetime <= commitMaxTime )
    $: filteredLines = data.filter((d) => d.datetime <= commitMaxTime )



    $: fileLengths = d3.rollups(data, v => d3.max(v, v => v.line), d => d.file);
    $: averageFileLength = d3.mean(fileLengths, d => d[1]);
    $: workByPeriod = d3.rollups(data, v => v.length, d => d.datetime.toLocaleString("en", {dayPeriod: "short"}))
    $: maxPeriod = d3.greatest(workByPeriod, (d) => d[1])?.[0];

    $: yScale = d3.scaleLinear([0,24], [usableArea.bottom, usableArea.top]);
    $: xScale = d3.scaleTime(d3.extent(filteredLines, d=>d.datetime), [usableArea.left, usableArea.right] ).nice()

    let hoveredIndex = -1;
    let hoveredCommit = {};



    async function dotInteraction(index, evt){
        let hoveredDot =  evt.target;
        if (evt.type === "mouseenter" || evt.type === "focus") {
            hoveredCommit = filteredCommits[index];
            tooltipPosition = await computePosition(hoveredDot, commitTooltip, {
                strategy: "fixed", 
                middleware: [
                    offset(5), 
                    autoPlacement() 
                    ],
                });
            }
        else if (evt.type === "mouseleave" || evt.type === "blur") {
            hoveredCommit = {};
            hoveredIndex = -1;
            }
        else if ((evt.type === "click") || (evt.type === "keyup" && evt.key === "Enter")) {
            selectedCommits = [filteredCommits[index]];
            }
    }



    let usableArea = {
	top: margin.top,
	right: width - margin.right,
	bottom: height - margin.bottom,
	left: margin.left
    };
    usableArea.width = usableArea.right - usableArea.left;
    usableArea.height = usableArea.bottom - usableArea.top;


    $: {d3.select(xAxis).call(d3.axisBottom(xScale));
        d3.select(yAxis).call(d3.axisLeft(yScale).tickFormat(d => String(d % 24).padStart(2, "0") + ":00"));
    }

    let yAxisGridlines;

    $: {
	d3.select(yAxisGridlines).call(
		d3.axisLeft(yScale)
		  .tickFormat("")
		  .tickSize(-usableArea.width)
        );
    }     


    let svg;
    $: {
        d3.select(svg).call(d3.brush().on("start brush end", brushed));
        d3.select(svg).selectAll(".dots, .overlay ~ *").raise();

    }

    let selectedCommits = [];

    function brushed (evt) {
        let brushSelection = evt.selection;
        selectedCommits = !brushSelection ? [] : filteredCommits.filter(commit => {
            let min = {x: brushSelection[0][0], y: brushSelection[0][1]};
            let max = {x: brushSelection[1][0], y: brushSelection[1][1]};
            let x = xScale(commit.date);
            let y = yScale(commit.hourFrac);

            return x >= min.x && x <= max.x && y >= min.y && y <= max.y;
        });
    }
        


    function isCommitSelected (commit) {
        return selectedCommits.includes(commit);
    }



    $: {
        d3.select(svg).call(d3.brush().on("start brush end", brushed));
        d3.select(svg).selectAll(".dots, .overlay ~ *").raise();
        }

    $: hasSelection = selectedCommits.length > 0;
    $: selectedLines = (hasSelection ? selectedCommits : filteredCommits).flatMap(d => d.lines);
    $: totalLines = selectedLines.length;
    $: languageBreakdown = d3.rollups(selectedLines, D=> D.length, d=> d.type)







</script>

<svelte:head>
	<title>Meta</title>
</svelte:head>
<h1>
    Meta
</h1>


<Scrolly  bind:progress={commitProgress}>
	{#each commits as commit, index }
        <p>
            On {commit.datetime.toLocaleString("en", {dateStyle: "full", timeStyle: "short"})},
            I made <a href="{commit.url}" target="_blank">{ index > 0 ? 'another glorious commit' : 'my first commit, and it was glorious' }</a>.
            I edited {commit.totalLines} lines across { d3.rollups(commit.lines, D => D.length, d => d.file).length } files.
            Then I looked over all I had made, and I saw that it was very good.
        </p>
    {/each}


	<svelte:fragment slot="viz">
		
        <svg viewBox="0 0 {width} {height}" bind:this={svg}>

            <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
            <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
            <g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines} />

            <g class="dots">
                {#each filteredCommits as commit, index (commit.id) }
                    <circle
                        cx={ xScale(commit.datetime) }
                        cy={ yScale(commit.hourFrac) }
                        r="5"
                        fill = "steelblue"
                        class:selected={isCommitSelected(commit)}
                        on:mouseenter= {evt => dotInteraction(index, evt)}
                        on:mouseenter={evt => {
                            hoveredIndex = index;
                            cursor = {x: evt.x, y: evt.y};
                        }}
                        on:mouseleave={evt => dotInteraction(index, evt)}
                        tabindex = "0"
                        aria-describedby="commit-tooltip"
                        role="tooltip"
                        aria-haspopup="true"
                        on:focus = {evt => dotInteraction(index, evt)}
                        on:blur = {evt => dotInteraction(index, evt)}             
                        on:click = {evt => dotInteraction(index, evt)}
                        on:keyup = {evt => dotInteraction(index, evt)}   
                    /> 
                {/each}
                </g>                
        </svg>

        <Pie data= {Array.from(languageBreakdown).map(([language,lines]) => ({label:language, value:lines}))}  colors = {colors}/>

	</svelte:fragment>
</Scrolly>


<Scrolly bounce= 50 throttle = 50 bind:progress={raceProgess} --scrolly-layout="viz-first">


    {#each commits as commit, index }
        <p>
            On {commit.datetime.toLocaleString("en", {dateStyle: "full", timeStyle: "short"})},
            I made <a href="{commit.url}" target="_blank">{ index > 0 ? 'another glorious commit' : 'my first commit, and it was glorious' }</a>.
            I edited {commit.totalLines} lines across { d3.rollups(commit.lines, D => D.length, d => d.file).length } files.
            Then I looked over all I had made, and I saw that it was very good.
        </p>
    {/each}
    
	<svelte:fragment slot="viz">
		<FileLines lines={racefilteredLines} colors = {colors} />
	</svelte:fragment>
</Scrolly>



<!-- <label class = "slider">
    Show commits until:
    <input type="range" min="0" max="100" step="1" bind:value = {commitProgress}>
    <time class="time-element">{commitMaxTime.toLocaleString()}</time>
</label> -->







<dl id="commit-tooltip" class="info tooltip" hidden={hoveredIndex === -1} style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px" bind:this = {commitTooltip}>
	<dt>Commit</dt>
	<dd><a href="{ hoveredCommit.url }" target="_blank">{ hoveredCommit.id }</a></dd>

	<dt>Date</dt>
	<dd>{ hoveredCommit.datetime?.toLocaleDateString("en", {dateStyle: "full"}) }</dd>

	<dt>Time</dt>
    <dd>{hoveredCommit.datetime?.toLocaleTimeString("en",{timeStyle: "full"} )}</dd>

    <dt>Author</dt>
    <dd>{hoveredCommit.author}</dd>

    <dt>Lines Edited</dt>
    <dd>{hoveredCommit.totalLines}</dd>
</dl>

<!-- <p>{hasSelection ? selectedCommits.length : "No"} commits selected</p> -->



<dl class = "language">
    {#each languageBreakdown as [language, lines] }
        <dt><strong>{language}</strong></dt>
        <dd>{lines} lines ({d3.format(".1~%")(lines / totalLines)})</dd>
    {/each}
</dl>


<dl class="stats">
	<dt>Total <abbr title="Lines of code">LOC</abbr></dt>
	<dd>{filteredLines.length}</dd>

    <dt>Maximum depth</dt>
    <dd>{d3.max(filteredLines, d => d.depth)}</dd>

    <dt>Number of files</dt>
    <dd>{d3.group(filteredLines, d => d.file).size}</dd>

    <dt>Average file length</dt>
    <dd>{averageFileLength}</dd>

    <dt>Time of day when most work is completed</dt>
    <dd>{maxPeriod}</dd>

</dl>



<style>
    :global(body){
        max-width: min(120ch, 80vw);
    }


    .slider {
    display: flex;
    align-items: center;
    }

    .slider input[type="range"] {
    flex: 1;
    }

    .slider .time-element {
    margin-left: 10px; /* Adjust margin as needed */
    }


    dl.language {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        margin-top: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f8f9fa; /* Lighter gray background */
        padding: 20px; /* Added padding for better spacing */
    }

    dl.language dt {
        grid-row:1;
        background-color: #f1c6d3; /* Pastel pink background for dt */
        color: #333; /* Dark text color */
        padding: 10px; /* Added padding for better spacing */
        /* margin-top: 10px; Separate dt elements */
    }

    dl.language dd {
        grid-row:2;
        padding: 10px; /* Added padding for better spacing */   
        margin-inline-start: 0;
    }





	svg {
		overflow: visible;
	}
    .gridlines {
	stroke-opacity: .2;
    }


    dl.info {
        display: grid;
        grid-template-columns: auto 1fr; 
        margin: 0;

        /* transition-duration: 500ms; */
        /* transition-property: opacity, visibility; */
        

        &[hidden]:not(:hover, :focus-within) {
            opacity: 0;
            visibility: hidden;
        } 

    }

    dt.info{
            font-weight: bold;
            /* transition-duration: 500ms;  */
        /* transition-property: opacity, visibility; */
        } 


    dl.tooltip {
        position: fixed;
        top: 1em; 
        left: 1em;
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 0.5em;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);


    }

    circle {
        transition: 200ms;
        &:hover {
            transform: scale(1.5);
        }
        transform-origin: center;
        transform-box: fill-box;
        @starting-style{
            r:0;
        }
    }

    circle.selected{
        fill:orange;
    }

    @keyframes marching-ants {
	to {
		stroke-dashoffset: -8; /* 5 + 3 */
	}
    }

    svg :global(.selection) {
        fill-opacity: 10%;
        stroke: black;
        stroke-opacity: 70%;
        stroke-dasharray: 5 3;
        animation: marching-ants 2s linear infinite;
    }



</style>
