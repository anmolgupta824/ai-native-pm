import { track } from '@vercel/analytics'

export { track }

// Event name constants for consistency
export const EVENTS = {
  CTA_CLICK: 'cta_click',
  MODULE_CARD_CLICK: 'module_card_click',
  EMAIL_SUBSCRIBE: 'email_subscribe',
  GITHUB_CLICK: 'github_click',
  MODE_SELECT: 'mode_select',
  NAV_CLICK: 'nav_click',
  EXTERNAL_LINK: 'external_link',
  FAQ_TOGGLE: 'faq_toggle',
} as const
