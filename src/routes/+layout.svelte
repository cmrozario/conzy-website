FOLO <slot />
<script>
    let colorScheme = "light dark";
    let root = globalThis?.document?.documentElement;
    $: root?.style.setProperty("color-scheme", colorScheme);
    let localStorage = globalThis.localStorage ?? {};
    $: localStorage.colorScheme = colorScheme;

    let profileData = fetch("https://api.github.com/users/your-username");

</script>


<label class="color-scheme">
    Theme:
     <select bind:value = { colorScheme}>
        <option value = "light dark">Automatic</option>
        <option value = "light">Light</option>
        <option value = "dark">Dark</option>
    </select>
</label>


<style>
    .color-scheme{
    position: absolute;
    top: .1rem; 
    right:1rem; 
    font-family:inherit; 
    font-size:80%;}

    dl {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    }

    dt {
    grid-row: 1;
    }

    dd {
    grid-row: 2;
    }

</style>

{#await fetch("https://api.github.com/users/cmrozario") }
	<p>Loading...</p>
{:then response}
	{#await response.json()}
		<p>Decoding...</p>
	{:then data}
        <section>
            <h2>My GitHub stats</h2>
            <dl>
                <dt>Followers</dt>
                <dd>{data.followers}</dd>
                <dt>Following</dt>
                <dd>{data.following}</dd>
                <dt>Public Repos</dt>
                <dd>{data.public_repos}</dd>
            </dl>
        </section>
	{:catch error}
		<p class="error">
			Something went wrong: {error.message}
		</p>
	{/await}
{:catch error}
	<p class="error">
		Something went wrong: {error.message}
	</p>
{/await}
