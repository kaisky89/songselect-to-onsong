// src/util/download.ts
var toDataUrl = (text) => `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
var download = (filename, text) => {
  const element = document.createElement("a");
  element.setAttribute("href", toDataUrl(text));
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

// src/util/midiProgram.ts
var calculateMidiProgram = (songNumber) => {
  const relevantNumber = Math.floor(songNumber / 10);
  const program = relevantNumber % 128;
  const bankLsb = Math.floor(relevantNumber / 128) % 128;
  const bankMsb = Math.floor(relevantNumber / 128 / 128) % 128;
  return {
    program,
    bankLsb,
    bankMsb
  };
};
var formatMidiProgram = (songNumber, channel) => {
  const { program, bankLsb, bankMsb } = calculateMidiProgram(songNumber);
  const channelSuffix = channel ? `@${channel}` : "";
  return `${bankMsb}.${bankLsb}:${program}${channelSuffix}`;
};

// src/util/replace.ts
var replace = (selector, from, to) => {
  const selectedElement = $(selector);
  if (!selectedElement)
    return;
  selectedElement.innerHTML = selectedElement.innerHTML.replace(from, to);
};

// src/formatters.ts
var formatHeaderSection = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
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
  const addMetaData = (name, value) => {
    var _a2, _b2;
    (_a2 = $(".cproSongHeader")) == null ? void 0 : _a2.append(document.createElement("br"));
    const element = document.createElement("p");
    value && (element.innerHTML = `${name}: ${value}<br />
      `);
    element.classList.add(`onsong${name}`);
    (_b2 = $(".cproSongHeader")) == null ? void 0 : _b2.append(element);
  };
  const tempoTimeWrapper = $(".cproTempoTimeWrapper");
  if (tempoTimeWrapper) {
    const [tempoString, timeString] = ((_f = (_e = $(".cproTempoTimeWrapper")) == null ? void 0 : _e.textContent) == null ? void 0 : _f.split("|").map((line) => line.trim())) || [];
    tempoTimeWrapper.innerHTML = "";
    const tempoValue = (_i = (_h = (_g = tempoString == null ? void 0 : tempoString.split("-")) == null ? void 0 : _g[1]) == null ? void 0 : _h.trim) == null ? void 0 : _i.call(_h);
    const tempoElement = document.createElement("p");
    tempoValue && (tempoElement.innerHTML = `Tempo: ${tempoValue}<br />`);
    tempoElement.classList.add("onsongTempo");
    (_j = $(".cproTempoTimeWrapper")) == null ? void 0 : _j.append(tempoElement);
    addMetaData("Time", timeString == null ? void 0 : timeString.split("-")[1].trim());
    (_k = tempoTimeWrapper.parentNode) == null ? void 0 : _k.append($(".songnumber") || "");
    replace(".songnumber", /.* (?=[0-9])/, "CCLI: ");
    const songNumber = parseInt(
      ((_n = (_m = (_l = $(".songnumber")) == null ? void 0 : _l.textContent) == null ? void 0 : _m.match(/[0-9]+/)) == null ? void 0 : _n[0]) || "0"
    );
    addMetaData("MIDI-Index", formatMidiProgram(songNumber, 15));
    addMetaData("MIDI", formatMidiProgram(songNumber, 14));
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

// src/songselectToOnsong.ts
var songselectToOnsong = ({
  shouldSkipBackup,
  output = "file"
} = {}) => {
  var _a;
  let recoverBackup = () => {
  };
  if (!shouldSkipBackup)
    recoverBackup = createBackup();
  formatHeaderSection();
  formatBodySection();
  formatFooterSection();
  const { fullText, titleText } = getTextContents();
  const outputMap = {
    file: () => download(`${titleText}.onsong`, fullText),
    console: () => console.log(fullText),
    newTab: () => {
      const newTab = window.open();
      newTab == null ? void 0 : newTab.document.write(`<pre>${fullText}</pre>`);
    },
    returnValue: () => fullText
  };
  const returnValue = (_a = outputMap[output]) == null ? void 0 : _a.call(outputMap);
  recoverBackup();
  return returnValue;
};

export {
  songselectToOnsong
};
