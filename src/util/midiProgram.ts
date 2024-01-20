export const calculateMidiProgram = (songNumber: number) => {
  // the last digit of the ccli songNumber seems to be some
  // kind of checksum and can be ignored
  const relevantNumber = Math.floor(songNumber / 10)

  const program = relevantNumber % 128
  const bankLsb = Math.floor(relevantNumber / 128) % 128
  const bankMsb = Math.floor(relevantNumber / 128 / 128) % 128
  return {
    program,
    bankLsb,
    bankMsb,
  }
}

export const formatMidiProgram = (songNumber: number, channel?: number) => {
  const { program, bankLsb, bankMsb } = calculateMidiProgram(songNumber)
  const channelSuffix = channel ? `@${channel}` : ''
  return `${bankMsb}.${bankLsb}:${program}${channelSuffix}`
}
