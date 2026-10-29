export type Language = 'ro' | 'en'

export interface SiteContent {
  languageName: string
  accessibility: {
    skipToContent: string
    chooseLanguage: string
    mainNavigation: string
    footerNavigation: string
    openMenu: string
    closeMenu: string
    selected: string
    notSelected: string
    pauseMascotAnimation: string
    playMascotAnimation: string
    languageOptions: Record<Language, string>
    logoAlt: string
    heroImageAlt: string
    storyImageAlt: string
    atmosphereImageAlt: string
  }
  nav: {
    story: string
    menu: string
    visit: string
    primaryAction: string
  }
  hero: {
    title: string
    description: string
    action: string
  }
  story: {
    title: string
    body: string
  }
  menu: {
    title: string
  }
  atmosphere: {
    title: string
    body: string
  }
  visit: {
    title: string
    location: string
    hours: Array<{ label: string; value: string }>
    email: string
  }
  footer: {
    domain: string
  }
}

export const businessFacts = {
  email: 'coffee@buzzybean.ro',
  domain: 'buzzybean.ro',
  weekdays: '07:30–19:00',
  weekend: '08:30–18:00',
} as const

export const siteContent: Record<Language, SiteContent> = {
  ro: {
    languageName: 'Română',
    accessibility: {
      skipToContent: 'Sari la conținut',
      chooseLanguage: 'Alege limba',
      mainNavigation: 'Navigare principală',
      footerNavigation: 'Navigare subsol',
      openMenu: 'Deschide navigarea',
      closeMenu: 'Închide navigarea',
      selected: 'selectată',
      notSelected: 'neselectată',
      pauseMascotAnimation: 'Oprește animația lui Buzzy',
      playMascotAnimation: 'Pornește animația lui Buzzy',
      languageOptions: { ro: 'Română', en: 'English' },
      logoAlt: 'Buzzy Bean Café & Bistro',
      heroImageAlt: 'Cappuccino, croissant cu miere și albinuța Buzzy într-o cafenea primitoare',
      storyImageAlt:
        'Interior luminos de cafenea cu mese din lemn și plante verzi',
      atmosphereImageAlt:
        'Prieteni savurând cafea împreună într-o cafenea luminoasă',
    },
    nav: {
      story: 'Poveste',
      menu: 'Meniu',
      visit: 'Vizitează-ne',
      primaryAction: 'Vino la noi',
    },
    hero: {
      title: 'Cafea bună, zile mai frumoase',
      description:
        'La Buzzy Bean, fiecare ceașcă e o poveste cu gust de miere.',
      action: 'Descoperă Buzzy Bean',
    },
    story: {
      title: 'O pauză bună începe aici.',
      body: 'Buzzy Bean este cafeneaua de cartier în care cafeaua atent pregătită întâlnește gustările proaspete și conversațiile fără grabă.',
    },
    menu: {
      title: 'Ce punem pe masă.',
    },
    atmosphere: {
      title: 'Loc pentru idei, prieteni și încă o cafea.',
      body: 'Dimineți liniștite, prânzuri lejere și conversații care merită prelungite.',
    },
    visit: {
      title: 'Ne vedem în București.',
      location: 'Locația din București va fi anunțată în curând.',
      hours: [
        { label: 'Luni–Vineri', value: businessFacts.weekdays },
        { label: 'Sâmbătă–Duminică', value: businessFacts.weekend },
      ],
      email: businessFacts.email,
    },
    footer: {
      domain: businessFacts.domain,
    },
  },
  en: {
    languageName: 'English',
    accessibility: {
      skipToContent: 'Skip to content',
      chooseLanguage: 'Choose language',
      mainNavigation: 'Primary navigation',
      footerNavigation: 'Footer navigation',
      openMenu: 'Open navigation',
      closeMenu: 'Close navigation',
      selected: 'selected',
      notSelected: 'not selected',
      pauseMascotAnimation: 'Pause Buzzy animation',
      playMascotAnimation: 'Play Buzzy animation',
      languageOptions: { ro: 'Romanian', en: 'English' },
      logoAlt: 'Buzzy Bean Café & Bistro',
      heroImageAlt: 'Cappuccino, honey croissant and Buzzy the bee in a welcoming café',
      storyImageAlt: 'Bright café interior with wooden tables and green plants',
      atmosphereImageAlt: 'Friends spending time together in a bright café',
    },
    nav: {
      story: 'Story',
      menu: 'Menu',
      visit: 'Visit us',
      primaryAction: 'Visit us',
    },
    hero: {
      title: 'Good coffee, sweeter days',
      description:
        'At Buzzy Bean, every cup tells a story with a taste of honey.',
      action: 'Discover Buzzy Bean',
    },
    story: {
      title: 'A good break starts here.',
      body: 'Buzzy Bean is the neighbourhood café where carefully made coffee meets fresh bites and conversations with nowhere else to be.',
    },
    menu: {
      title: 'What we bring to the table.',
    },
    atmosphere: {
      title: 'Room for ideas, friends, and one more coffee.',
      body: 'Quiet mornings, easy lunches, and conversations worth stretching out.',
    },
    visit: {
      title: 'See you in Bucharest.',
      location: 'Our Bucharest location is coming soon.',
      hours: [
        { label: 'Monday–Friday', value: businessFacts.weekdays },
        { label: 'Saturday–Sunday', value: businessFacts.weekend },
      ],
      email: businessFacts.email,
    },
    footer: {
      domain: businessFacts.domain,
    },
  },
}
