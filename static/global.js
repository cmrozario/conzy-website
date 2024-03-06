console.log("IT’S not ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

let pages = {
	".": "Home",
	"projects": "Projects",
    "contacts": "Contacts",
	"https://github.com/cmrozario": "My Github",
    "resume": "Resume",
};

let nav = document.createElement("nav");
document.body.prepend(nav);


document.body.insertAdjacentHTML("afterbegin", `
	<label class="color-scheme" style = "position: absolute; top: .1rem; right:1rem; font-family:inherit; font-size:80%;">
		Theme:
		<select>
			<option value = "light dark">Automatic</option>
			<option value = "light">Light</option>
			<option value = "dark">Dark</option>
		</select>
	</label>`
);



function setColorScheme(colorScheme) {
	localStorage.setItem("colorScheme", colorScheme);
	document.documentElement.style.setProperty("color-scheme", colorScheme)
}

(function (){
	var select = document.querySelector(".color-scheme select")
	select.addEventListener("input", function(event){
		setColorScheme(event.target.value)
	})
	var storedColor = localStorage.getItem("colorScheme");
	if (storedColor) {
		setColorScheme(storedColor);
		select.value = storedColor;
	}else{
		setColorScheme("light dark");
		select.value = "light dark";

	}
})();


const ARE_WE_HOME = document.documentElement.classList.contains("home");


for (let url in pages) {
    let title = pages[url];
    // url = !ARE_WE_HOME && !url.startsWith("http") ? "../" + url : url;
    let a = document.createElement("a");
	a.href = url;
	a.textContent = title;
	nav.append(a);
	a.classList.toggle("current", a.host === location.host && a.pathname === location.pathname);
	// a.toggleAttribute("target", a.host  !== location.host);
	if (a.host !== location.host) {
		a.setAttribute("target", "_blank");
	}
}
