"use strict";

// src/index.ts
document.querySelectorAll(".cproAuthors br").forEach((el) => el.replaceWith(" | "));
$(".cproAuthor2").prepend("{subtitle: ");
$(".cproAuthor2").append("}");
var replace = (selector, from, to) => {
  $(selector).html($(selector).html().replace(from, to));
};
replace(".cproSongKeyWrapper", "Tonart", "Key");
replace(".cproTempoTimeWrapper", "Taktart", "Time");
$(".chord").prepend("[");
$(".chord").append("]");
$(".cproComment").append(":");
$(".cproSongKeyWrapper").insertAfter($(".cproAuthors"));
$(".songnumber").insertAfter($(".cproTempoTimeWrapper"));
$(".cproTitle").append("<br>");
$(".cproAuthors").append("<br>");
$(".cproSongKeyWrapper").append("<br>");
replace(".cproSongKeyWrapper", " - ", ": ");
replace(".cproSongKeyWrapper", " | ", "");
replace(".cproTempoTimeWrapper", " - ", ": ");
replace(".cproTempoTimeWrapper", " - ", ": ");
replace(".cproTempoTimeWrapper", " | ", "<br>");
replace(".songnumber", "-Liednummer ", ": ");
$(".cproSSLogo").remove();
