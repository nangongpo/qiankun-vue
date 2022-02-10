<script>
import { isExternal } from '@/utils/validate'

export default {
  name: 'app-link',
  functional: true,
  props: {
    to: {
      type: String,
      required: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context
    const { to } = props
    if (isExternal(to)) {
      return h(
        'a',
        {
          attrs: {
            target: '_blank',
            rel: 'noopener',
            href: to
          }
        },
        scopedSlots.default()
      )
    } else {
      return h('router-link',
        {
          // todo: 点击侧边栏，重定向redirect页面，实现刷新
          props: {
            to: '/redirect' + to
          }
        },
        // scopedSlots.default()
        context.children
      )
    }
  }
}
</script>
