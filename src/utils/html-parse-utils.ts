import axios from 'axios'
import parse, { HTMLElement } from 'node-html-parser'

const newlineRegExp = /[\r\n]/g

export function getElementText(
  element: HTMLElement,
  selector: string,
  replaceRegExp: RegExp | string = newlineRegExp,
  replaceWith: string = '',
): string {
  const rootHtml = element.querySelector(selector)
  if (!rootHtml) {
    return ''
  }
  return rootHtml.text.trim().replace(replaceRegExp, replaceWith)
}

export async function getParsedHtmlFromGamepediaUrl(
  url: string,
): Promise<HTMLElement> {
  return parse((await axios.get(url)).data.parse.text['*'])
}
