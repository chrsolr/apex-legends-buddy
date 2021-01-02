export interface Legends {
  id: number
  name: string
  desc: string
  imageUrl: string
  profileUrl: string
  classIconUrl: string
  classDesc: string
  className: string
  insight: LegendsInsight
}

export interface LegendsInsight {
  name: string
  usageRate: number
  kpm: string | number | undefined
}

export interface LegendProfile {
  bio: string[]
  quote: string
  info: LegendProfileInfo
  abilities: LegendProfileAbilities[]
  skins: LegendProfileSkin[]
}

export interface LegendProfileInfo {
  name: string
  imageUrl: string
  desc: string
  realName: string
  gender: string
  age: string
  weight: string
  height: string
  homeWorld: string
  voiceActor: string
}

export interface LegendProfileAbilities {
  name: string
  imageUrl: string
  description: [{ name: string; value: string }]
  info: string[]
  interactions: string[]
  tips: string[]
}

export interface LegendProfileSkin {
  rarity: string
  color: string
  skins: LegendProfileSkinItem[]
}

export interface LegendProfileSkinItem {
  name: string
  rarity: string
  imageUrl: string
  materialImageUrl: string
  materialCost: string
  requirement: string
}
