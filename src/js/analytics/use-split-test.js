/* eslint-disable no-undef */

import { useEffect, useState } from 'react'

import { isDev } from 'src/constants'

const defaultValues = { randomSplit: false, logSplitEvent: () => {} }

function useSplitTest({
  testId = '000000',
  testName = 'RandomSplitBehavior',
  testValues = ['A', 'B'],
  testSplit = 0.5,
  updateUrl = false,
  activeFrom,
  activeTo,
}) {
  const [splitData, setSplitData] = useState(defaultValues)

  useEffect(() => {
    // Return early during SSR.
    if (typeof window === 'undefined' || !testValues || testValues.length !== 2) {
      return
    }

    const now = new Date().getTime()

    // Check active dates.
    if (activeFrom) {
      const activeFromDate = new Date(activeFrom)
      if (now <= activeFromDate.getTime()) {
        isDev && console.warn('SplitTest is not yet active. Starts at:', activeFrom)
        return
      }
    }
    if (activeTo) {
      const activeToDate = new Date(activeTo)
      if (now >= activeToDate.getTime()) {
        isDev && console.warn('Test is no longer active. Ended at:', activeTo)
        return
      }
    }

    // Check split validity.
    if (testSplit <= 0 || testSplit >= 1) {
      isDev && console.warn('Invalid testSplit value. Must be between 0 and 1.')
      return
    }

    // Get or set split value.
    let randomSplit
    const STORAGE_KEY = `${testId}_${testName}`

    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem(STORAGE_KEY)) {
        const { value, timestamp } = JSON.parse(localStorage.getItem(STORAGE_KEY))
        if (now - timestamp < 24 * 60 * 60 * 1000) {
          randomSplit = value
        } else {
          randomSplit = Math.random() < 0.5
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ value: randomSplit, timestamp: now }))
        }
      } else {
        randomSplit = Math.random() < 0.5
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ value: randomSplit, timestamp: now }))
      }
    }

    const eventName = `x-${testId}`
    const testValue = testValues[randomSplit ? 1 : 0]

    const commonEventAttributes = {
      test_id: testId,
      test_name: testName,
      test_value: testValue,
    }

    const url = new URL(window.location.href)
    url.searchParams.set(testId, testValue)

    // Log page view once.
    if (window.gtag) {
      const currentUrl = url.toString()
      const currentLocation = `${window.location.href}${eventName}/${testValue}` // Mock location.pathname just for GA.

      if (updateUrl) {
        window.history.pushState({}, '', currentUrl)
      }

      gtag('event', `${eventName} View ${testValue}`, {
        result: `page_view ${testValue}`,
        page_location: currentLocation,
        ...commonEventAttributes,
      })
    }

    // Set split data.
    setSplitData({
      randomSplit,
      logSplitEvent: () => {
        if (window.gtag) {
          gtag('event', `${eventName} Click ${testValue}`, {
            result: `click ${testValue}`,
            ...commonEventAttributes,
          })
        }
      },
    })
  }, [])

  return splitData
}

export default useSplitTest
