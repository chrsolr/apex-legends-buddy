import axios from 'axios'
import parse, { HTMLElement } from 'node-html-parser'

const newlineRegExp = /[\r\n]/g

export function getElementText(
  element: HTMLElement,
  selector: string,
  replaceRegExp: RegExp | string = newlineRegExp,
  replaceWith: string = '',
): string {
  try {
    const rootHtml = element.querySelector(selector)
    if (!rootHtml) {
      return ''
    }
    return rootHtml.text.trim().replace(replaceRegExp, replaceWith)
  } catch (e) {
    throw Error(`getElementText: ${e}`)
  }
}

export async function getParsedHtmlFromGamepediaUrl(
  url: string,
): Promise<HTMLElement> {
  try {
    return parse((await axios.get(url)).data.parse.text['*'])
  } catch (e) {
    throw Error(`getParsedHtmlFromGamepediaUrl: ${e}`)
  }
}
