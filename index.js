"use strict";
(() => {
  // src/util/download.ts
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

  // src/util/selector.ts
  var $ = (selector, { multiple } = {}) => {
    var _a;
    const shadowRoot = (_a = document.querySelector("#ChordSheetViewerContainer")) == null ? void 0 : _a.shadowRoot;
    if (!shadowRoot)
      return;
    if (!multiple)
      return shadowRoot.querySelector(selector);
    return shadowRoot.querySelectorAll(selector);
  };

  // src/util/createBackup.ts
  var createBackup = () => {
    var _a;
    const backupHtml = (_a = $("div")) == null ? void 0 : _a.innerHTML;
    return () => {
      $("div").innerHTML = backupHtml || "";
    };
  };

  // src/util/replace.ts
  var replace = (selector, from, to) => {
    const selectedElement = $(selector);
    if (!selectedElement)
      return;
    selectedElement.outerHTML = selectedElement.outerHTML.replace(from, to);
  };

  // src/formatters.ts
  var formatHeaderSection = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    (_a = $(".cproSSLogo")) == null ? void 0 : _a.remove();
    (_b = $(".cproAuthors br", { multiple: true })) == null ? void 0 : _b.forEach(
      (el) => el.replaceWith(" | ")
    );
    (_c = $(".cproAuthor2", { multiple: true })) == null ? void 0 : _c.forEach((el) => {
      el.prepend("{subtitle: ");
      el.append("}");
    });
    replace(".cproSongKeyWrapper", "Tonart", "Key");
    replace(".cproSongKeyWrapper", " - ", ": ");
    replace(".cproSongKeyWrapper", " | ", "");
    (_d = $(".cproSongKeyWrapper")) == null ? void 0 : _d.append(document.createElement("br"));
    const tempoTimeWrapper = $(".cproTempoTimeWrapper");
    if (tempoTimeWrapper) {
      const [tempoString, timeString] = ((_f = (_e = $(".cproTempoTimeWrapper")) == null ? void 0 : _e.textContent) == null ? void 0 : _f.split("|").map((line) => line.trim())) || [];
      tempoTimeWrapper.innerHTML = "";
      const tempoValue = tempoString == null ? void 0 : tempoString.split("-")[1].trim();
      const tempoElement = document.createElement("p");
      tempoElement.innerHTML = `Tempo: ${tempoValue}<br />`;
      tempoElement.classList.add("onsongTempo");
      (_g = $(".cproTempoTimeWrapper")) == null ? void 0 : _g.append(tempoElement);
      (_h = $(".cproSongHeader")) == null ? void 0 : _h.append(document.createElement("br"));
      const timeValue = timeString == null ? void 0 : timeString.split("-")[1].trim();
      const timeElement = document.createElement("p");
      timeElement.innerHTML = `Time: ${timeValue}<br />`;
      timeElement.classList.add("onsongTime");
      (_i = $(".cproSongHeader")) == null ? void 0 : _i.append(timeElement);
      (_j = tempoTimeWrapper.parentNode) == null ? void 0 : _j.append($(".songnumber") || "");
      replace(".songnumber", " Song #", ":");
    }
  };
  var formatBodySection = () => {
    var _a, _b;
    (_a = $(".chord", { multiple: true })) == null ? void 0 : _a.forEach((el) => {
      el.prepend("[");
      el.append("]");
    });
    (_b = $(".cproComment", { multiple: true })) == null ? void 0 : _b.forEach((el) => el.append(":"));
  };
  var formatFooterSection = () => {
    var _a;
    (_a = $(".copyright-info")) == null ? void 0 : _a.remove();
  };

  // src/getTextContents.ts
  var getTextContents = () => {
    var _a, _b, _c, _d, _e, _f;
    const headerText = (_b = (_a = $(".cproSongHeader")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim().split("\n").filter((line) => !!line.trim()).map((line) => line.trim()).join("\n").replace(/\s{2}/g, " ");
    const bodyText = (_d = (_c = $(".cproSongBody")) == null ? void 0 : _c.textContent) == null ? void 0 : _d.trim();
    const titleText = (_f = (_e = $(".cproTitle")) == null ? void 0 : _e.textContent) == null ? void 0 : _f.trim();
    const fullText = `${headerText}

${bodyText}`;
    return { headerText, bodyText, titleText, fullText };
  };

  // src/index.ts
  var songseletToOnsong = ({
    shouldSkipBackup
  } = {}) => {
    let recoverBackup = () => {
    };
    if (!shouldSkipBackup)
      recoverBackup = createBackup();
    formatHeaderSection();
    formatBodySection();
    formatFooterSection();
    const { fullText, titleText } = getTextContents();
    download(`${titleText}.onsong`, fullText);
    recoverBackup();
  };
  songseletToOnsong();
})();
