
<script>
 </script>

<svelte:head>
	<title>A4</title>
</svelte:head>

<body>
	<header>
		<h1>
			<small>Assignment 4</small>
			Persuasive or Deceptive Visualization?
		</h1>

		<p>
			<strong>Consecrata Rozario</strong> — <em>crozario@mit.edu</em>
		</p>
	</header>

	<main>
    <h2> Cases of police brutality have decreased in the form of fewer complaints against New York City police officers.</h2>

		<section>
      <h3>FOR the Proposition</h3>
	  <figure>
		<img src="images/a4pics/for.png" alt="Heap map showing civilian complaints against the NYPD in 2015 and 2019" width="100%" />
		<figcaption>
			This visualization shows the number of complaints filed against the NYPD in 2015 and in 2019. We see a sharp decrease across a number of precincts.
		</figcaption>
	</figure>

	<p>
		Design Decisions and Rationale:
	</p>

	<ul>
		<li>For this visualization I removed the unsubstatiated claims. Removing these showed a much sharper gradient change in many of the precincts and it is a "truthful" portrayal of the data as a complaint is deemed unsubstantiated 
			shouldn't be used toward a total count. I did, howvever, keep the exonderated complaints in the visualization becuase I found that removing them lowered the complaint counts in 2015 significantly and the change in gradient between the two years wasn't 
			immediately apparent anymore. Removing the unsubstantiated data gets a deception score of 1.5 and keeping the exonerated data gets a deception score of -1.5 as I did it to strictly skew the data. 
		</li>
		<li>I used a gradient of 1-50 on both of the graphs. I debated using different gradients on the graphs, not including a legend, and letting the reader think they were on the same scale but that seemed egregious. This gets a deception score of 2. 
		</li>
		<li>I chose the years 2015 and 2019 very specifically. I produced the heatmap for all years between 2011 and 2019 and chose two that looked drasically different. There were many fluctuations in between of certain neighborhoods having increased complaints 
			then decreasing during the timeframe, but I wanted two years to support just my hypothesis. I could have added a few more years (small multiples) but there was no clear decline between the years that I was looking for. This gets a deception score of -2. 
		</li>
		<li>
			I wanted to quantify the changes that are shown in the heatmap so I included the barchart highlighting the different in a few precincts. I those the precincts with the top 5 largest percent changes. I didn't specify anywhere that I was not looking at magnitude. 
			So these are the top 5 positive percent changes. I labeled these on the heatmap so you can see the color changes. The decision to only show the largest positive percent changes is has a -2 deception score. 
		</li>
		<li>
			I used a color gradient to show the "calmness" of the 2019 graph. It gives the illusion of peace and warm light pink in contrast to the deep red helps the deep red pop more. I also colored the bar chart very specifically so that the reader would 
			associate 2015 with the deep red and 2019 with the light pink which is directly corresponding to the conclusion I want them to make. This has a -.5 deception score. I am not misrepresenting anything, just trying to make the reader form associations.
		</li>
	</ul>






    <section>
      <h3>AGAINST the Proposition</h3>

      <figure>
				<img src="images/a4pics/Forprop.png" alt="Graph showing civilian complaints against the NYPD" width = "100%" />
				<figcaption>
					This line graph shows the number of complaints filed against the NYPD from 1984 to 2018. We see a steady rise in complaints.
				</figcaption>
			</figure>

			<p>
				Design Decisions and Rationale:
			</p>

			<ul>
				<li>I ommited 2019 and 2020. 2020 only had four datapoints and should be ommited. This gets a deception score of 2. 2019 however, has a significant amount of points but much smaller than 2018. This did not fit my narrative at all so I chose to end the 
					graph at 2018 and let the reader interpolate. This gets a deception score of -1.5.
				</li>
				<li>I was very specific with which annotations I included. I thought about including reform measure like mandatory body cams and sentensing of officers who have killed innocent people but this would not further my point. So I chose to only include 
					"negative" events like protests and killings. I also gave the especially horrible details of them with the hope of impacting the reader. This gets a deception score of -.5. 
			   </li>
				<li>I chose to fill in the area below the graph because it stark contrast to the white area on top and puts alot of emphasis on the growth. I filled it in with a navy to draw associations with the NYPD. This gets a deception score of .5.</li>
				<li>
					I chose the locations of the annotations to look like they grow with the graph. I wanted to show them ascending to add to the idea that this is a growing issue and complaints have been and are going to keep rising dramatically rather than stack them 
					on the x axis. This 
					gets a deception score of .5. 
				</li>
			</ul>
    </section>

    <section>
      <h2>Final Reflection</h2>

      <p>At times I thought this project was really difficult and at times I thought it was really easy. This came from the fact that I felt like I could make the data say whatever I wanted. By limiting some fields, changing color gradients, playing with dates, 
		I could write any narrative I wanted to. This made the work easy but it was very hard to decide what exactly to do and what was "allowed". Outside of the context of this assignment, we are never really thinking about the opposing argument this hard and trying to prove it, so we don't face this dilema. 
		I am used to having an opinion of the data and enforcing that opinion. To do it in the reverse direction really opened my eyes to how I may be doing some of these deceptions subconsciously. I learned how important having open mind is.

	  </p>
	  <p>
		I would define ethical analysis and visualization as a practice where the author has done their due dilligence to learn about the data and represent it in the most authentic way possible. This can be done while still having an opinion on the data. Good work, I believe, 
		should be persuasive, but the line is drawn when you are hiding information, misrepresenting the data and are not open to being incorrect. 
	  </p>
    </section>
	</main>
</body>



<style>
    /* @import url("https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.1/github-markdown.css"); */

:root {
	--color-neutral-95: hsl(220 10% 95%);
	--color-neutral-90: hsl(220 10% 90%);
	--color-neutral-80: hsl(220 10% 80%);
	--color-neutral-70: hsl(220 10% 70%);
	--color-neutral-60: hsl(220 10% 60%);
	--color-neutral-50: hsl(220 10% 50%);
	--color-neutral-40: hsl(220 10% 40%);
	--color-neutral-30: hsl(220 10% 30%);
	--color-neutral-20: hsl(220 10% 20%);
	--color-neutral-10: hsl(220 10% 10%);
}

html {
	font: 100%/1.5 system-ui;
	counter-reset: figure;
	background: var(--color-neutral-95);
	max-width: min(75vw, 80em);
	margin: 0 auto;
}

/* Headings */

h1, h2, h3, h4, h5, h6 {
	line-height: 1.1;
	font-weight: 600;
	text-wrap: balance;
}

h1, h2 {
	border-bottom: 1px solid var(--color-neutral-80);
	padding-bottom: .2em;
}

h1 {
	margin-block: 1em .5rem;
	font-size: clamp(2.5em, 150% + 2vh + 2vw, 10vmin);
	font-weight: 800;

	small {
		display: block;
		width: fit-content;
		padding: .2em .5em;
		margin-inline: auto;
		color: white;
		background: var(--color-neutral-40);
		font-size: 40%;
		text-transform: uppercase;
		white-space: nowrap;
	}
}

h2 {
	font-size: 180%;
	color: var(--color-neutral-30);
}

h3 {
	font-size: 130%;
}

/* Lists */

ul, ol {
	padding-inline-start: 2em;
}

li {
	&::marker {
		color: var(--color-neutral-40);
	}

	/* + li { */
    &:not(:first-child){
		margin-top: .2em;
	};
}

/* Sectioning elements */

header {
	padding-block: 1em;
	text-align: center;
}

main {
	background: white;
	color: var(--color-neutral-20);
	border-radius: 1rem;
	padding: 0.1rem 2rem;
}

/* Figures */

figure {
	margin: 1em 0;
	padding: .5rem;
	margin-inline: -.5em;
	border: 1px solid var(--color-neutral-80);
	box-shadow: 0 .1em .2em var(--color-neutral-95);
	text-align: center;
	background: white;

	> figcaption {
		font: 500 75% var(--font-sans);
		background: var(--color-neutral-95);
		padding: .5rem;
		margin: -.5rem;
		margin-top: .5rem;
		counter-increment: figure;
		text-align: left;

		&::before {
			content: "Figure " counter(figure) ": ";
			font-weight: bold;
			color: var(--color-neutral-40);
		}

		a:not(:hover, :focus, :active) {
			color: inherit;
			text-decoration: underline;
			text-decoration-color: color-mix(in lab, currentColor, transparent 70%);
		}
	}
}
</style>