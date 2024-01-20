import { $ } from './selector'

export const replace = (
  selector: string,
  from: string | RegExp,
  to: string
) => {
  const selectedElement = $(selector)
  if (!selectedElement) return

  selectedElement.innerHTML = selectedElement.innerHTML.replace(from, to)
}
