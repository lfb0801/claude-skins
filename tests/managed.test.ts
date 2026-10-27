import type { On } from 'claude-code'
import { expect, test } from 'claude-code/testing'
import { register } from '../hooks/register'

test('managed compatibility does not register the two guarded hooks', () => {
  const events: string[] = []
  const on = ((event: string) => { events.push(event) }) as unknown as On
  register(on, { managedCompatibility: true })
  expect(events.includes('classic.SessionStart')).toBe(false)
  expect(events.includes('prompt.compose')).toBe(false)
  expect(events.includes('session.append')).toBe(true)
  expect(events.includes('ui.render')).toBe(true)
  events.length = 0
  register(on, {})
  expect(events.includes('classic.SessionStart')).toBe(true)
  expect(events.includes('prompt.compose')).toBe(true)
})
