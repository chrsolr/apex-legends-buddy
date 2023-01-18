type has_id = {
  id: number | string
}

export type LegendDetails = {
  name: string
  desc: string
  imageUrl: string
  profileUrl: string
  classIconUrl: string
  classDesc: string
  className: string
  insight: LegendInsight
} & has_id

type LegendInsight = {
  name: string
  usageRate: number
  kpm: string | number | undefined
}

export type LegendProfileAbility = {
  name: string
  imageUrl: string
  description: [{ name: string; value: string }]
  info: string[]
  interactions: string[]
  tips: string[]
}

export type LegendProfileSkin = {
  rarity?: string
  color?: string
  skins: LegendProfileSkinItem[]
}

export type LegendProfileSkinItem = has_id & {
  name: string
  rarity: string
  imageUrl: string
}

export type GamepediaSection = {
  toclevel: number
  level: string
  line: string
  number: string
  index: string
  fromtitle: string
  byteoffset: number
  anchor: string
}
