<script>
    export let info = {};
    let p = info;
    export let hLevel = 2;
</script>

<article>
    <svelte:element this={"h" + hLevel}>{info.title}</svelte:element>
    <img src={p.image} alt="">
    <p><a href = ".">{p.description}</a></p>
</article>


<style>


article{
	display:grid;
	grid-template-rows: subgrid;
	grid-row: span 3;
	h2{
		margin:0;
	};

}
</style>