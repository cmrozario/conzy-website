<slot />
<script>
    let colorScheme = "light dark";
    let root = globalThis?.document?.documentElement;
    $: root?.style.setProperty("color-scheme", colorScheme);
    let localStorage = globalThis.localStorage ?? {};
    $: localStorage.colorScheme = colorScheme;

    let profileData = fetch("https://api.github.com/users/your-username");

    export const prerender = true;


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
</style>

