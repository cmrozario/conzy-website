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
	"meta": "Meta",
};

let nav = document.createElement("nav");
document.body.prepend(nav);


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
