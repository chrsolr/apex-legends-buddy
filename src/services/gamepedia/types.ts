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

export type LegendProfile = {
  bio: string[]
  info: LegendProfileInfo
  abilities: LegendProfileAbility[]
  skins: LegendProfileSkin[]
  // loadingScreens: LegendProfileLoadingScreen[]
  // finishers: LegendProfileFinisher[]
  heirloom: LegendHeirloom | undefined
  // skydiveEmotes: LegendProfileSkydiveEmote[]
}

export type LegendInsight = {
  name: string
  usageRate: number
  kpm: string | number | undefined
}

export type LegendProfileAbility = {
  name: string
  imageUrl: string
  description: { name: string; value: string }[]
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

export type LegendHeirloom = {
  imageUrl: string | undefined
  desc: {
    name: string
    banner: string
    quip: string
  }
}

export type LegendProfileInfo = {
  name: string
  imageUrl: string
  desc: string
  realName: string
  gender: string
  age: string
  homeWorld: string
  legendType: string
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
