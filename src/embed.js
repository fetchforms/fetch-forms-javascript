import "./styles/fetch-forms.scss";
import { setPermission } from "./auth/permission";
import createFetchForm from "./render/index";

// auto-run the script
const embedForm = document.addEventListener("readystatechange", (event) => {
	if (event.target.readyState === "interactive" || event.target.readyState === "complete") {
		processEmbed();
	}
});
embedForm();

export default async function processEmbed() {
	const currentScript = document.currentScript;
	const dataAttrs = currentScript.dataset;
	const placement = document.createElement("div");
	const placementId = `fetch-form-${dataAttrs.slug}`;

	// Add the div to the page
	placement.setAttribute("id", placementId);
	currentScript.after(placement);
	setPermission(dataAttrs.permission);

	const onCompleteCallback = (data) => {
		console.log("onComplete", JSON.stringify(data, null, 2));
	};
	const onDataCallback = (data) => {
		console.log("onData", JSON.stringify(data, null, 2));
	};

	await createFetchForm(dataAttrs.slug, placementId, onCompleteCallback, onDataCallback);
}
