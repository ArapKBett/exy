import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

// Function to format number with commas
export const formatNumberWithCommas = (number) => {
  const formattedNumber = number.toLocaleString('en-US')
  return formattedNumber.split('')
}

const AnimatedNumber = ({ value, duration, withCommas = false }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Change this to false if you want the animation to restart every time it comes into view
  })
  const [currentNumber, setCurrentNumber] = useState(0)
  const [digits, setDigits] = useState(currentNumber.toString().split('').map(Number))

  const animateNumber = (targetNumber) => {
    const animDuration = duration || 1500 // Duration in ms
    const steps = 50 // Number of steps for the animation

    const change = targetNumber / steps
    const multiplier = change < 0 ? -1 : 1

    const intervalId = setInterval(() => {
      setCurrentNumber((prevNumber) => {
        const newNumber =
          multiplier *
          Math.min(multiplier * targetNumber, multiplier * Math.round(prevNumber + change))

        if (newNumber === targetNumber) clearInterval(intervalId)

        return newNumber
      })
    }, animDuration / steps)
  }

  useEffect(() => {
    if (inView) {
      animateNumber(value)
    }
  }, [inView])

  useEffect(() => {
    withCommas
      ? setDigits(formatNumberWithCommas(currentNumber))
      : setDigits(currentNumber.toString().split('').map(Number))
  }, [currentNumber, withCommas])

  return (
    <span ref={ref}>
      {digits.map((digit, i) => (
        <span key={i} className="x__animated-number__digit">
          {digit}
        </span>
      ))}
    </span>
  )
}

export default AnimatedNumber
