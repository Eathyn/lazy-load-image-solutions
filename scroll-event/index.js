// 判断图片是否进入视口
function isVisible(elem) {
  const coords = elem.getBoundingClientRect()
  // 视口高度
  const windowHeight = window.innerHeight
  // 图片的顶边在视图中
  const isTopVisible = coords.top > 0 && coords.top < windowHeight
  // 图片的底边在视图中
  const isBottomVisible = coords.bottom > 0 && coords.bottom < windowHeight
  return isTopVisible || isBottomVisible
}

function loadImage() {
  const lazyImages = document.querySelectorAll('img[data-src]')
  lazyImages.forEach((lazyImage) => {
    const realSrc = lazyImage.dataset.src
    // 避免重复下载已经下载完成的图片
    if (!realSrc) {
      return
    }
    // 图片进入视口，加载图片
    if (isVisible(lazyImage)) {
      lazyImage.src = realSrc
      // 避免重复下载已经下载完成的图片
      lazyImage.dataset.src = ''
    }
  })
}

loadImage()
window.addEventListener('scroll', _.throttle(loadImage, 200))
