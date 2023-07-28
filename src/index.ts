const $ = <TMultiple extends boolean = false>(
  selector: string,
  { multiple }: { multiple?: TMultiple } = {}
): TMultiple extends true
  ? NodeListOf<Element> | null | undefined
  : Element | null | undefined => {
  const shadowRoot = document.querySelector('#ChordSheetViewerContainer')
    ?.shadowRoot
  if (!shadowRoot) return
  if (!multiple) return shadowRoot.querySelector(selector) as any
  return shadowRoot.querySelectorAll(selector) as any
}

const replace = (selector: string, from: string, to: string) => {
  const selectedElement = $(selector)
  if (!selectedElement) return

  selectedElement.outerHTML = selectedElement.outerHTML.replace(from, to)
}

const download = (filename: string, text: string) => {
  const element = document.createElement('a')
  element.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
  )
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

const backupHtml = $('div')?.innerHTML

////////////////////
// Header Section //
////////////////////

// Songselect Logo
$('.cproSSLogo')?.remove()

// Authors
$('.cproAuthors br', { multiple: true })?.forEach((el) => el.replaceWith(' | '))
$('.cproAuthor2', { multiple: true })?.forEach((el) => {
  el.prepend('{subtitle: ')
  el.append('}')
})

// Key
replace('.cproSongKeyWrapper', 'Tonart', 'Key')
replace('.cproSongKeyWrapper', ' - ', ': ')
replace('.cproSongKeyWrapper', ' | ', '')
$('.cproSongKeyWrapper')?.append(document.createElement('br'))

const tempoTimeWrapper = $('.cproTempoTimeWrapper')
if (tempoTimeWrapper) {
  // Tempo
  const [tempoString, timeString] =
    $('.cproTempoTimeWrapper')
      ?.textContent?.split('|')
      .map((line) => line.trim()) || []
  tempoTimeWrapper.innerHTML = ''
  const tempoValue = tempoString?.split('-')[1].trim()
  const tempoElement = document.createElement('p')
  tempoElement.innerHTML = `Tempo: ${tempoValue}<br />`
  tempoElement.classList.add('onsongTempo')
  $('.cproTempoTimeWrapper')?.append(tempoElement)

  // Time
  $('.cproSongHeader')?.append(document.createElement('br'))
  const timeValue = timeString?.split('-')[1].trim()
  const timeElement = document.createElement('p')
  timeElement.innerHTML = `Time: ${timeValue}<br />`
  timeElement.classList.add('onsongTime')
  $('.cproSongHeader')?.append(timeElement)

  // Song Number
  tempoTimeWrapper.parentNode?.append($('.songnumber') || '')
  replace('.songnumber', ' Song #', ':')
}

////////////////////
//  Body Section  //
////////////////////

// Chords
$('.chord', { multiple: true })?.forEach((el) => {
  el.prepend('[')
  el.append(']')
})

// Section Headings
$('.cproComment', { multiple: true })?.forEach((el) => el.append(':'))

////////////////////
// Footer Section //
////////////////////

// remove copyright footer
$('.copyright-info')?.remove()

////////////////////
//   Processing   //
////////////////////

// get text content
const headerText = $('.cproSongHeader')
  ?.textContent?.trim()
  .split('\n')
  .filter((line) => !!line.trim())
  .map((line) => line.trim())
  .join('\n')
  .replace(/\s{2}/g, ' ')

const bodyText = $('.cproSongBody')?.textContent?.trim()

const titleText = $('.cproTitle')?.textContent?.trim()

const fullText = `${headerText}\n\n${bodyText}`

download(`${titleText}.onsong`, fullText)

$('div')!.innerHTML = backupHtml || ''
