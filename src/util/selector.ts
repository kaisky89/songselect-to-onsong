export const $ = <TMultiple extends boolean = false>(
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
