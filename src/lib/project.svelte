

<article>
    <h2>{p.title}</h2>
    <img src={p.image} alt="">
    <p><a href = "A2_report.html">{p.description}</a></p>
</article>

<script>
    export let info = {};
    let p = info;
    export let hLevel = 2;
</script>


<svelte:element this={"h" + hLevel}>{info.title}</svelte:element>


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
	};

}
</style>