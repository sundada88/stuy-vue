import Vue from 'vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

const req = require.context('./', false, /\.svg$/)
req.keys().map(req)

Vue.component('svg-icon', SvgIcon)
