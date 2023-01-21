import { getParsedHtmlFromGamepediaUrl } from '../../utils/html-parse-utils'
import {
  baseUrl,
  getHeirloom,
  getLegendBio,
  getLegendSkins,
  getSectionIndex,
  getUsageRates,
  parseAllLegends,
  parseLegendAbilities,
  parseLegendInfoBox,
} from './herpers'
import { LegendDetails, LegendProfile } from './types'

/**
 * @description Get all Apex Legends and Summary Details
 * @returns LegendDetails[]
 */
export async function getAllLegends(): Promise<LegendDetails[]> {
  const pageName = 'Legend'
  const sectionName = 'Available_Legends'
  const sectionIndex = await getSectionIndex(pageName, sectionName)

  const url = `${baseUrl}/api.php?action=parse&page=${pageName}&format=json&prop=text&section=${sectionIndex}`
  const rootElement = await getParsedHtmlFromGamepediaUrl(url)
  const legends = parseAllLegends(rootElement)

  const insights = await getUsageRates()
  const mappedLegends = legends.map((value) => ({
    ...value,
    insight: insights.find((element) => element.name === value.name) || {
      kpm: 'N/A',
      name: value.name,
      usageRate: 0,
    },
  }))
  return mappedLegends as LegendDetails[]
}

/**
 * @description Get Apex Legend Profile Info
 *
 * @param legendName Apex Legends Name
 * @returns All Apex Legends Information
 */
export async function getLegendProfile(
  legendName: string,
): Promise<LegendProfile> {
  const url = `${baseUrl}/api.php?action=parse&format=json&page=${legendName}`
  const rootElement = await getParsedHtmlFromGamepediaUrl(url)

  const bio = await getLegendBio(legendName)
  const skins = await getLegendSkins(legendName)
  const heirloom = await getHeirloom(legendName)
  const info = parseLegendInfoBox(rootElement)
  const abilities = parseLegendAbilities(rootElement)

  return {
    info,
    bio,
    abilities,
    skins,
    heirloom,
  }
}
