<script>
    import * as d3 from "d3";
    import Pie from "$lib/Pie.svelte";
    import { onMount } from "svelte";

    let data = [];
    let commits = [];

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

  


    $: fileLengths = d3.rollups(data, v => d3.max(v, v => v.line), d => d.file);
    $: averageFileLength = d3.mean(fileLengths, d => d[1]);
    $: workByPeriod = d3.rollups(data, v => v.length, d => d.datetime.toLocaleString("en", {dayPeriod: "short"}))
    $: maxPeriod = d3.greatest(workByPeriod, (d) => d[1])?.[0];

    let width = 1000, height = 600;
    // dateExtent = d3.extent(commits, commit => (commit.datetime));
    $: yScale = d3.scaleLinear([0,24], [usableArea.bottom, usableArea.top]);
    $: xScale = d3.scaleTime(d3.extent(data, d=>d.datetime), [usableArea.left, usableArea.right] ).nice()



    // dateExtent = d3.extent(commits, commit => (commit.datetime));
    // $: yScale = d3.scaleLinear()
    //         .domain([0,24])
    //         .range([usableArea.bottom, usableArea.top]);              
    
    // $: xScale = d3.scaleTime()
    //         .domain(dateExtent)
    //         .range([usableArea.left, usableArea.right])
    //         .nice();


    let margin = {top: 10, right: 10, bottom: 30, left: 20};

    let usableArea = {
	top: margin.top,
	right: width - margin.right,
	bottom: height - margin.bottom,
	left: margin.left
    };
    usableArea.width = usableArea.right - usableArea.left;
    usableArea.height = usableArea.bottom - usableArea.top;

   let xAxis, yAxis;

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

    let hoveredIndex = -1;
    let hoveredCommit = {};
    $: if (hoveredIndex != -1){
        hoveredCommit = commits[hoveredIndex];
    }

    let cursor = {x: 0, y: 0};    


    let svg;
    $: {
        d3.select(svg).call(d3.brush().on("start brush end", brushed));
        d3.select(svg).selectAll(".dots, .overlay ~ *").raise();

    }

    let brushSelection;
    function brushed (evt) {
        brushSelection = evt.selection
    }
    
   


    function isCommitSelected (commit) {
        if (!brushSelection) {
            return false;
        }
        let min = {x: brushSelection[0][0], y: brushSelection[0][1]};
        let max = {x: brushSelection[1][0], y: brushSelection[1][1]};
        let x = xScale(commit.date);
        let y = yScale(commit.hourFrac);
        return x >= min.x && x <= max.x && y >= min.y && y <= max.y;

}

$: {
    d3.select(svg).call(d3.brush().on("start brush end", brushed));
    d3.select(svg).selectAll(".dots, .overlay ~ *").raise();
}

$: selectedCommits = brushSelection ? commits.filter(isCommitSelected) : [];
$: console.log(selectedCommits)
$: hasSelection = brushSelection && selectedCommits.length > 0;

$: selectedLines = (hasSelection ? selectedCommits : commits).flatMap(d => d.lines);

$: totalLines = selectedLines.length;
$: languageBreakdown = d3.rollups(selectedLines, D=> D.length, d=> d.type)

    
</script>

<svelte:head>
	<title>Meta</title>
</svelte:head>
<h1>
    Meta
</h1>

<!-- <h2>Commits by time of day</h2> -->




<svg viewBox="0 0 {width} {height}" bind:this={svg}>

    <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
    <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />

    <g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines} />
    


	<g class="dots">
        {#each commits as commit, index }
            <circle
                cx={ xScale(commit.datetime) }
                cy={ yScale(commit.hourFrac) }
                r="5"
                fill = "steelblue"
                class:selected={isCommitSelected(commit)}
                on:mouseenter= {evt => hoveredIndex = index}
                on:mouseenter={evt => {
                    hoveredIndex = index;
                    cursor = {x: evt.x, y: evt.y};
                }}
                on:mouseleave={evt => hoveredIndex = -1}
                
            /> 
        {/each}
        </g>
        
</svg>


<dl id="commit-tooltip" class="info tooltip" hidden={hoveredIndex === -1} style="top: {cursor.y}px; left: {cursor.x}px">
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

<p>{hasSelection ? selectedCommits.length : "No"} commits selected</p>


<Pie data= {Array.from(languageBreakdown).map(([language,lines]) => ({label:language, value:lines}))} />
<dl class = "language">
    {#each languageBreakdown as [language, lines] }
        <dt><strong>{language}</strong></dt>
        <dd>{lines} lines ({d3.format(".1~%")(lines / totalLines)})</dd>
    {/each}
</dl>


<dl class="stats">
	<dt>Total <abbr title="Lines of code">LOC</abbr></dt>
	<dd>{data.length}</dd>

    <dt>Maximum depth</dt>
    <dd>{d3.max(data, d => d.depth)}</dd>

    <dt>Number of files</dt>
    <dd>{d3.group(data, d => d.file).size}</dd>

    <dt>Average file length</dt>
    <dd>{averageFileLength}</dd>

    <dt>Time of day when most work is completed</dt>
    <dd>{maxPeriod}</dd>

</dl>



<style>
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
