import { replace } from './util/replace'
import { $ } from './util/selector'

export const formatHeaderSection = () => {
  // Songselect Logo
  $('.cproSSLogo')?.remove()

  // Authors
  $('.cproAuthors br', { multiple: true })?.forEach((el) =>
    el.replaceWith(' | ')
  )
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
}

export const formatBodySection = () => {
  // Chords
  $('.chord', { multiple: true })?.forEach((el) => {
    el.prepend('[')
    el.append(']')
  })

  // Section Headings
  $('.cproComment', { multiple: true })?.forEach((el) => el.append(':'))
}

export const formatFooterSection = () => {
  // remove copyright footer
  $('.copyright-info')?.remove()
}
