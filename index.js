"use strict";

// src/index.ts
var $ = (selector, { multiple } = {}) => {
  var _a13;
  const shadowRoot = (_a13 = document.querySelector("#ChordSheetViewerContainer")) == null ? void 0 : _a13.shadowRoot;
  if (!shadowRoot)
    return;
  if (!multiple)
    return shadowRoot.querySelector(selector);
  return shadowRoot.querySelectorAll(selector);
};
var replace = (selector, from, to) => {
  const selectedElement = $(selector);
  if (!selectedElement)
    return;
  selectedElement.outerHTML = selectedElement.outerHTML.replace(from, to);
};
var download = (filename, text) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
var _a;
var backupHtml = (_a = $("div")) == null ? void 0 : _a.innerHTML;
var _a2;
(_a2 = $(".cproSSLogo")) == null ? void 0 : _a2.remove();
var _a3;
(_a3 = $(".cproAuthors br", { multiple: true })) == null ? void 0 : _a3.forEach((el) => el.replaceWith(" | "));
var _a4;
(_a4 = $(".cproAuthor2", { multiple: true })) == null ? void 0 : _a4.forEach((el) => {
  el.prepend("{subtitle: ");
  el.append("}");
});
replace(".cproSongKeyWrapper", "Tonart", "Key");
replace(".cproSongKeyWrapper", " - ", ": ");
replace(".cproSongKeyWrapper", " | ", "");
var _a5;
(_a5 = $(".cproSongKeyWrapper")) == null ? void 0 : _a5.append(document.createElement("br"));
var tempoTimeWrapper = $(".cproTempoTimeWrapper");
var _a6, _b, _c, _d, _e, _f;
if (tempoTimeWrapper) {
  const [tempoString, timeString] = ((_b = (_a6 = $(".cproTempoTimeWrapper")) == null ? void 0 : _a6.textContent) == null ? void 0 : _b.split("|").map((line) => line.trim())) || [];
  tempoTimeWrapper.innerHTML = "";
  const tempoValue = tempoString == null ? void 0 : tempoString.split("-")[1].trim();
  const tempoElement = document.createElement("p");
  tempoElement.innerHTML = `Tempo: ${tempoValue}<br />`;
  tempoElement.classList.add("onsongTempo");
  (_c = $(".cproTempoTimeWrapper")) == null ? void 0 : _c.append(tempoElement);
  (_d = $(".cproSongHeader")) == null ? void 0 : _d.append(document.createElement("br"));
  const timeValue = timeString == null ? void 0 : timeString.split("-")[1].trim();
  const timeElement = document.createElement("p");
  timeElement.innerHTML = `Time: ${timeValue}<br />`;
  timeElement.classList.add("onsongTime");
  (_e = $(".cproSongHeader")) == null ? void 0 : _e.append(timeElement);
  (_f = tempoTimeWrapper.parentNode) == null ? void 0 : _f.append($(".songnumber") || "");
  replace(".songnumber", " Song #", ":");
}
var _a7;
(_a7 = $(".chord", { multiple: true })) == null ? void 0 : _a7.forEach((el) => {
  el.prepend("[");
  el.append("]");
});
var _a8;
(_a8 = $(".cproComment", { multiple: true })) == null ? void 0 : _a8.forEach((el) => el.append(":"));
var _a9;
(_a9 = $(".copyright-info")) == null ? void 0 : _a9.remove();
var _a10, _b2;
var headerText = (_b2 = (_a10 = $(".cproSongHeader")) == null ? void 0 : _a10.textContent) == null ? void 0 : _b2.trim().split("\n").filter((line) => !!line.trim()).map((line) => line.trim()).join("\n").replace(/\s{2}/g, " ");
var _a11, _b3;
var bodyText = (_b3 = (_a11 = $(".cproSongBody")) == null ? void 0 : _a11.textContent) == null ? void 0 : _b3.trim();
var _a12, _b4;
var titleText = (_b4 = (_a12 = $(".cproTitle")) == null ? void 0 : _a12.textContent) == null ? void 0 : _b4.trim();
var fullText = `${headerText}

${bodyText}`;
download(`${titleText}.onsong`, fullText);
$("div").innerHTML = backupHtml || "";
