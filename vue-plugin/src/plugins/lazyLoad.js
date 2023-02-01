const throttle = require('lodash/throttle')

const lazyLoad = {
  install(app, options) {
    const placeholderImg = options.placeholderImg

    app.directive('lazy', {
      created(el, binding) {
        const realImgSrc = binding.value
        el.setAttribute('data-src', realImgSrc)
        el.setAttribute('src', placeholderImg)
      },
      mounted() {
        if (IntersectionObserver) {
          lazyLoad.observe()
        } else {
          lazyLoad.loadImage()
          window.addEventListener('scroll', throttle(lazyLoad.loadImage, 200))
        }
      },
    })
  },

  observe() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target
            lazyImage.src = lazyImage.dataset.src
            observer.unobserve(lazyImage)
          }
        })
      },
    )
    const images = document.querySelectorAll('img[data-src]')
    images.forEach((image) => observer.observe(image))
  },

  loadImage() {
    const lazyImages = document.querySelectorAll('img[data-src]')
    lazyImages.forEach((lazyImage) => {
      const realSrc = lazyImage.dataset.src
      // 避免重复下载已经下载完成的图片
      if (!realSrc) {
        return
      }
      // 图片进入视口，加载图片
      if (lazyLoad.isVisible(lazyImage)) {
        lazyImage.src = realSrc
        // 避免重复下载已经下载完成的图片
        lazyImage.dataset.src = ''
      }
    })
  },

  // 判断图片是否进入视口
  isVisible(elem) {
    const coords = elem.getBoundingClientRect()
    // 视口高度
    const windowHeight = window.innerHeight
    // 图片的顶边在视图中
    const isTopVisible = coords.top > 0 && coords.top < windowHeight
    // 图片的底边在视图中
    const isBottomVisible = coords.bottom > 0 && coords.bottom < windowHeight
    return isTopVisible || isBottomVisible
  },
}

export default lazyLoad
