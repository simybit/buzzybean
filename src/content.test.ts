import { describe, expect, test } from 'vitest'

import { businessFacts, siteContent } from './content'
import { menuCategories } from './menuContent'

describe('bilingual site content', () => {
  test('contains_complete_copy_for_each_language', () => {
    expect(Object.keys(siteContent)).toEqual(['ro', 'en'])

    expect(siteContent.ro.hero.title).toBe('Cafea bună, zile mai frumoase')
    expect(siteContent.en.hero.title).toBe('Good coffee, sweeter days')
    expect(menuCategories).toHaveLength(4)
    expect(siteContent.ro.visit.location).toContain('București')
    expect(siteContent.en.visit.location).toContain('Bucharest')
  })

  test('keeps_business_facts_identical_between_languages', () => {
    expect(businessFacts).toEqual({
      email: 'coffee@buzzybean.ro',
      domain: 'buzzybean.ro',
      weekdays: '07:30–19:00',
      weekend: '08:30–18:00',
    })

    expect(siteContent.ro.visit.email).toBe(businessFacts.email)
    expect(siteContent.en.visit.email).toBe(businessFacts.email)
    expect(siteContent.ro.visit.hours.map(({ value }) => value)).toEqual([
      businessFacts.weekdays,
      businessFacts.weekend,
    ])
    expect(siteContent.en.visit.hours.map(({ value }) => value)).toEqual([
      businessFacts.weekdays,
      businessFacts.weekend,
    ])
  })

  test('contains_no_unapproved_business_claims', () => {
    const serialized = JSON.stringify(siteContent)

    expect(serialized).not.toMatch(/\b\d+[.,]\d{2}\s?(lei|ron)\b/i)
    expect(serialized).not.toMatch(/strada|str\.|bulevard|calea/i)
    expect(serialized).not.toMatch(/testimonial|review|recenzie/i)
    expect(serialized).not.toMatch(/instagram|facebook|tiktok|https?:\/\//i)
  })
})
