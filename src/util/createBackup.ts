import { $ } from './selector'

export const createBackup = () => {
  const backupHtml = $('div')?.innerHTML
  return () => {
    $('div')!.innerHTML = backupHtml || ''
  }
}
