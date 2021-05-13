<template>
  <div class="animated-banner" ref="container">
    <div class="layer"><img src="bilibili/img/distant-mountains.png" data-height="360" data-width="9666" height="180" width="4833" style="transform: scale(1) translate(0px, -15px) rotate(0deg); opacity: 1;"></div>
    <div class="layer"><img src="bilibili/img/distant-forests.png" data-height="360" data-width="9666" height="180" width="4833" style="transform: scale(1) translate(1100px, 0px) rotate(0deg); opacity: 1;"></div>
    <div class="layer"><img src="bilibili/img/forest.png" data-height="360" data-width="3523" height="162" width="1585" style="transform: scale(1) translate(675px, 0px) rotate(0deg); opacity: 1;"></div>
    <div class="layer"><img src="bilibili/img/willow-and-bridge.png" data-height="360" data-width="2938" height="176" width="1439" style="transform: scale(1) translate(-637px, 0px) rotate(0deg); opacity: 1;"></div>
    <div class="layer"><img src="bilibili/img/board.png" data-height="139" data-width="556" height="62" width="250" style="transform: scale(1) translate(607.5px, 45px) rotate(0deg); opacity: 1;"></div>
    <div class="layer"><img src="bilibili/img/girls-board.png" data-height="302" data-width="734" height="84" width="205" style="transform: scale(1) translate(252px, 36.4px) rotate(0deg); opacity: 0;"></div>
    <div class="layer"><img src="bilibili/img/cherry-tree-once.png" data-height="180" data-width="1757" height="125" width="1229" style="transform: scale(1) translate(112px, 14px) rotate(0deg); opacity: 1;"></div>
    <div class="layer"><img src="bilibili/img/family.png" data-height="116" data-width="1757" height="81" width="1229" style="transform: scale(1) translate(-350px, 49px) rotate(0deg); opacity: 1;"></div>
    <div class="layer"><img src="bilibili/img/girl-kite.png" data-height="346" data-width="497" height="138" width="198" style="transform: scale(1) translate(-240px, 16px) rotate(0deg); opacity: 0;"></div>
    <div class="layer"><img src="bilibili/img/girl-running.png" data-height="256" data-width="146" height="102" width="58" style="transform: scale(1) translate(-340px, 32px) rotate(0deg); opacity: 0;"></div>
    <div class="layer"><img src="bilibili/img/cherry-tree-3.png" data-height="254" data-width="602" height="114" width="270" style="transform: scale(1) translate(-90px, 13.5px) rotate(0deg); opacity: 1;"></div>
    <div class="layer"><img src="bilibili/img/grass-and-cherry.png" data-height="360" data-width="4277" height="180" width="2138" style="transform: scale(1) translate(100px, 0px) rotate(0deg); opacity: 1;"></div>
    <div class="layer"><img src="bilibili/img/girls-camping.png" data-height="327" data-width="933" height="147" width="419" style="transform: scale(1) translate(216px, 13.5px) rotate(0deg); opacity: 1;"></div>
    <div class="layer"><img src="bilibili/img/willow-branches.png" data-height="353" data-width="740" height="211" width="444" style="transform: scale(1) translate(2100px, 0px) rotate(0deg); filter: blur(2px); opacity: 1;"></div>
    <div class="layer"><img src="bilibili/img/close-shot-of-cherry-tree.png" data-height="360" data-width="1916" height="180" width="958" style="transform: scale(1) translate(-1000px, 0px) rotate(0deg); filter: blur(1px); opacity: 1;"></div>
    <canvas width="1155" height="155" style="position: absolute; top: 0; left: 0;"></canvas>
  </div>
</template>
<script>
export default {
  name: 'Banner',
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      let rafId = 0
      let displace = 0
      let enterX = 0
      let isEntered = false

      const container = this.$refs.container
      let containerHeight = container.clientHeight
      let containerWidth = container.clientWidth
      let containerScale = containerHeight / 155

      const layers = Array.prototype.slice.call(container.querySelectorAll('.layer'))
      const images = layers.map(el => {
        let child = el.children[0]
        // transform: scale(1) translate(-637px, 0px) rotate(0deg); opacity: 1;
        const [x, y] = child.getAttribute('style')
          .replace(/.*translate\((-?[.0-9]+)px, (-?[.0-9]+)px\).+/g, '$1,$2')
          .split(',')
        return {
          el: child,
          x: +x,
          y: +y,
          scale: {
            initial: child.width / child.dataset.width
          }
        }
      })
      console.log(images)

      const af = () => {
        // console.log(enterX, displace)
        images.forEach(({ el, x, y }) => {
          el.style.transform = `scale(1) translate(${x + x * displace}px, ${y}px) rotate(0deg)`
          el.style.opacity = 1
        })
      }

      const handleLeave = () => {
        const now = performance.now()
        const timeout = 200
        const tempDisplace = displace
        cancelAnimationFrame(rafId)
        const leaveAF = t => {
          if (t - now < timeout) {
            displace = tempDisplace * (1 - (t - now) / 200)
            af(t)
            rafId = requestAnimationFrame(leaveAF)
          } else {
            displace = 0
            af(t)
          }
        }
        rafId = requestAnimationFrame(leaveAF)
      }

      /**
       * mouse leave
       */
      this.handleMouseLeave = () => {
        isEntered = false
        handleLeave()
      }

      /**
       * mouse move
       * @param e
       */
      this.handleMouseMove = (e) => {
        const offsetY = document.documentElement.scrollTop + e.clientY
        if (offsetY < containerHeight) {
          if (!isEntered) {
            isEntered = true
            enterX = e.clientX
          }
          displace = (e.clientX - enterX) / containerWidth
          cancelAnimationFrame(rafId)
          rafId = requestAnimationFrame(af)
        } else {
          if (isEntered) {
            isEntered = false
            handleLeave()
          }
        }
      }

      /**
       * window resize
       */
      this.handleResize = () => {
        containerHeight = container.clientHeight
        containerWidth = container.clientWidth
        containerScale = containerHeight / 155
        images.forEach(item => {
          const el = item.el
          // el.dataset.height * containerScale * lc.scale?.initial
          el.height = el.dataset.height * containerScale * item.scale.initial
          el.width = el.dataset.width * containerScale * item.scale.initial
        })

        cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(t => {
          af(t)
        })
      }

      document.addEventListener('mouseleave', this.handleMouseLeave)
      window.addEventListener('mousemove', this.handleMouseMove)
      window.addEventListener('resize', this.handleResize)
    },
    handleMouseLeave() {},
    handleMouseMove() {},
  },
  beforeDestroy() {
    document.removeEventListener('mouseleave', this.handleMouseLeave)
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="less">
  .animated-banner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    height: 155px;
    .layer {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
