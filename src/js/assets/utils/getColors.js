const getColors = (asset) => {
  const gradient = asset?.gradientColors
  const primary = asset?.primaryColor

  return { primary, gradient }
}

export default getColors
