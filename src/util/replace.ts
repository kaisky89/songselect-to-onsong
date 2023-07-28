import { $ } from './selector'

export const replace = (selector: string, from: string, to: string) => {
  const selectedElement = $(selector)
  if (!selectedElement) return

  selectedElement.outerHTML = selectedElement.outerHTML.replace(from, to)
}
