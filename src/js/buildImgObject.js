export default (data) => {
  let src = ''
  let srcSet = ''
  let srcWebp = ''
  let srcSetWebp = ''
  let sizes = ''
  data.files.forEach((file, index) => {
    src = `${data.path}${file.fileName}.${data.fileType}`
    srcSet += `${src} ${file.width}w`
    srcWebp = `${data.path}${file.fileName}.webp`
    srcSetWebp += `${srcWebp} ${file.width}w`
    if (index !== data.files.length - 1) {
      srcSet += ','
      srcSetWebp += ','
      sizes += `(max-width: ${file.width}px) 100vw,`
    } else {
      sizes += `${file.width}px`
    }
  })

  const obj = {
    aspectRatio: data.aspectRatio,
    src: src,
    srcSet: srcSet,
    sizes: sizes,
  }

  if (data.webp) {
    obj.srcWebp = srcWebp
    obj.srcSetWebp = srcSetWebp
  }

  return obj
}
