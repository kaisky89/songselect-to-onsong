import { formatMidiProgram } from './util/midiProgram'
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

  const addMetaData = (name: string, value?: string) => {
    $('.cproSongHeader')?.append(document.createElement('br'))
    const element = document.createElement('p')
    value &&
      (element.innerHTML = `${name}: ${value}<br />
      `)
    element.classList.add(`onsong${name}`)
    $('.cproSongHeader')?.append(element)
  }

  const tempoTimeWrapper = $('.cproTempoTimeWrapper')
  if (tempoTimeWrapper) {
    // Tempo
    const tempoAndTimeStrings =
      $('.cproTempoTimeWrapper')
        ?.textContent?.split('|')
        .map((line) => line.trim()) || []
    tempoTimeWrapper.innerHTML = ''
    const tempoString = tempoAndTimeStrings.find(
      (line) => line.includes('Tempo') || !line.includes('/')
    )
    const timeString = tempoAndTimeStrings.find(
      (line) =>
        line.includes('Taktart') || line.includes('Time') || line.includes('/')
    )
    const tempoValue = tempoString?.split('-')?.[1]?.trim?.()
    const tempoElement = document.createElement('p')
    tempoValue && (tempoElement.innerHTML = `Tempo: ${tempoValue}<br />`)
    tempoElement.classList.add('onsongTempo')
    $('.cproTempoTimeWrapper')?.append(tempoElement)

    // Time
    addMetaData('Time', timeString?.split('-')[1].trim())

    // Song Number
    tempoTimeWrapper.parentNode?.append($('.songnumber') || '')
    replace('.songnumber', /.* (?=[0-9])/, 'CCLI: ')

    // MIDI Programm
    const songNumber = parseInt(
      $('.songnumber')?.textContent?.match(/[0-9]+/)?.[0] || '0'
    )
    // receiving program number
    addMetaData('MIDI-Index', formatMidiProgram(songNumber, 15))
    // sending program number
    addMetaData('MIDI', formatMidiProgram(songNumber, 14))
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
