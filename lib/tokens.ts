// Single source of colour truth for Tailwind, the 3D scene and generated images.
export const colors = {
  bg: '#060608',
  surface: '#0d0d12',
  surface2: '#14141b',
  hairline: '#22222c',
  fieldBorder: '#6b6b78',
  fg: '#f4f2ed',
  muted: '#a19fa8',
  gold: '#d8b676',
  goldFill: '#c8a15a',
  goldSoft: '#2a2214',
  onGold: '#0b0b0e',
  ink: '#0b0b0f',
} as const;

export type ColorToken = keyof typeof colors;
