/* global $ */

// make sure authors are in 1 line
document
  .querySelectorAll('.cproAuthors br')
  .forEach((el) => el.replaceWith(' | '));

// handle explicit second author line
$('.cproAuthor2').prepend('{subtitle: ');
$('.cproAuthor2').append('}');

// replace helper
const replace = (selector, from, to) => {
  $(selector).html($(selector).html().replace(from, to));
};

// translate
replace('.cproSongKeyWrapper', 'Tonart', 'Key');
replace('.cproTempoTimeWrapper', 'Taktart', 'Time');

// create syntax
$('.chord').prepend('[');
$('.chord').append(']');
$('.cproComment').append(':');

// order items
$('.cproSongKeyWrapper').insertAfter($('.cproAuthors'));
$('.songnumber').insertAfter($('.cproTempoTimeWrapper'));

// add line breaks
$('.cproTitle').append('<br>');
$('.cproAuthors').append('<br>');
$('.cproSongKeyWrapper').append('<br>');

// correct formating
replace('.cproSongKeyWrapper', ' - ', ': ');
replace('.cproSongKeyWrapper', ' | ', '');
replace('.cproTempoTimeWrapper', ' - ', ': ');
replace('.cproTempoTimeWrapper', ' - ', ': ');
replace('.cproTempoTimeWrapper', ' | ', '<br>');
replace('.songnumber', '-Liednummer ', ': ');

// remove songselect logo
$('.cproSSLogo').remove();
