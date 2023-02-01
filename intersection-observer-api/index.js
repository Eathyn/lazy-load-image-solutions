const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      // 图片进入视口
      if (entry.isIntersecting) {
        // 加载图片
        const lazyImage = entry.target
        lazyImage.src = lazyImage.dataset.src
        // 避免重复执行
        observer.unobserve(lazyImage)
      }
    })
  },
)

const images = document.querySelectorAll('img[data-src]')
images.forEach((image) => observer.observe(image))
