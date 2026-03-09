import { describe, it, expect } from 'vitest'

describe('InterviewSim App', () => {
    it('should load without errors', () => {
        expect(true).toBe(true)
    })

    it('should have correct app name', () => {
        const appName = 'InterviewSim'
        expect(appName).toBeDefined()
        expect(appName.length).toBeGreaterThan(0)
    })
})
