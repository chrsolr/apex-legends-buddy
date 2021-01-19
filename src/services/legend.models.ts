interface has_id {
  id: number | string
}

export interface Legends extends has_id {
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
  abilities: LegendProfileAbility[]
  skins: LegendProfileSkin[]
  loadingScreens: LegendProfileLoadingScreen[]
  finishers: LegendProfileFinisher[]
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

export interface LegendProfileAbility {
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

export interface LegendProfileSkinItem extends has_id {
  name: string
  rarity: string
  imageUrl: string
  materialImageUrl: string
  materialCost: string
  requirement: string
}

export interface LegendProfileLoadingScreen extends has_id {
  name: string
  rarity: string
  imageUrl: string
  desc?: LegendProfileLoadingScreenDetails
}

export interface LegendProfileLoadingScreenDetails {
  title: string
  earnedOn?: string
  descriptions: string[]
}

export interface LegendProfileFinisher extends has_id {
  name: string
  rarity: string
  videoUrl: string
  materialImageUrl: string
  materialCost: string
}
