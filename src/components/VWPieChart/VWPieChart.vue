<template>
  <div class="vw-chart__wrapper">
    <div :class="`vw-chart vw-chart--pie vw-chart--${name}`"></div>
    <div class="vw-chart__legend-list">
      <div
        class="vw-chart__legend-item"
        @mouseenter="handleMouseEnter(item)"
        @mouseleave="handleMouseLeave(item)"
        v-for="(item, index) in chartData"
        :key="item.label">
        <div class="vw-chart__legend-color" :style="{backgroundColor: colorData[index]}">
        </div>
        <div class="vw-chart__legend-label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'vw-pie-chart',
  props: {
    chartData: Array,
    colorData: Array,
    name: String,
    width: String,
    height: String
  },
  data () {
    return {
      svgPanel: null,
      pie: null,
      dataReady: null,
      arc: null
    }
  },
  computed: {
    radius () {
      return Math.min(this.width, this.height) / 2
    },
    color () {
      return d3.scaleOrdinal()
        .domain(this.dataReady)
        .range(this.colorData)
    }
  },
  methods: {
    initial () {
      // Create Panel
      this.svgPanel = d3.select(`.vw-chart--${this.name}`)
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .append('g')
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)

      this.svgPanel.append('g')
        .attr('class', 'slices')
      this.svgPanel.append('g')
        .attr('class', 'labels')

      // Create Pie
      this.pie = d3.pie()
        .sort(null)
        .value(d => d.value.percent)

      // Map data
      this.dataReady = this.pie(d3.entries(this.chartData))

      // Arc
      this.arc = d3.arc().innerRadius(0).outerRadius(this.radius)
    },
    drawChart () {
      // Draw slice
      this.svgPanel.select('.slices')
        .selectAll('path.slice')
        .data(this.dataReady)
        .enter()
        .append('path')
        .attr('class', 'vw-chart__slice')
        .attr('id', d => `${this.name}-slice-${this.convertId(d.data.value.label)}`)
        .attr('d', this.arc)
        // .attr('fill', d => this.color(d.data.key))
        .attr('fill', d => this.colorData[d.data.key])
        .on('mouseenter', d => this.handleMouseEnter({
          label: d.data.value.label,
          percent: d.data.value.percent
        }))
        .on('mouseleave', d => this.handleMouseLeave({
          label: d.data.value.label,
          percent: d.data.value.percent
        }))

      // Draw labels
      this.svgPanel.select('.labels')
        .selectAll('text')
        .data(this.dataReady, d => d.label)
        .enter()
        .append('text')
        .attr('dy', '.35em')
        .attr('id', d => `${this.name}-label-${this.convertId(d.data.value.label)}`)
        .attr('font-size', '0.8125rem')
        .attr('fill', d => d.data.value.percent > 10 ? '#fff' : this.colorData[d.data.key])
        .attr('text-anchor', 'middle')
        .attr('class', d => d.data.value.percent > 10 ? 'vw-chart__label' : 'vw-chart__label vw-chart__label--hide')
        .text(d => `${d.data.value.percent}%`)
        .transition()
        .duration(1000)
        .attrTween('transform', d => {
          let interpolate = d3.interpolate(null, d)
          return t => {
            let d2 = interpolate(t)
            let labelArc = d3.arc().innerRadius(0).outerRadius(this.radius * 1.15)
            let center = labelArc.centroid(d2)
            let pos = d.data.value.percent > 10 ? center : this.outerLabelPos(d2, this.radius)
            return `translate(${pos})`
          }
        })
    },
    handleMouseEnter (item) {
      let { label, percent } = item
      let targetLabelId = `#${this.name}-label-${this.convertId(label)}`
      let $targetLabel = document.querySelector(targetLabelId)
      let targetSliceId = `#${this.name}-slice-${this.convertId(label)}`
      let $targetSlice = document.querySelector(targetSliceId)
      $targetSlice.classList.add('vw-chart__slice--selected')
      percent < 10 && $targetLabel.classList.remove('vw-chart__label--hide')
    },
    handleMouseLeave (item) {
      let { label, percent } = item
      let targetLabelId = `#${this.name}-label-${this.convertId(label)}`
      let $targetLabel = document.querySelector(targetLabelId)
      let targetSliceId = `#${this.name}-slice-${this.convertId(label)}`
      let $targetSlice = document.querySelector(targetSliceId)
      $targetSlice.classList.remove('vw-chart__slice--selected')
      percent < 10 && $targetLabel.classList.add('vw-chart__label--hide')
    },
    convertId (value) {
      return value.replace(/\s|\+|[^a-zA-Z0-9 ]/g, '').toLowerCase()
    },
    outerLabelPos (d, radius) {
      let outArc = d3.arc().innerRadius(radius * 1.3).outerRadius(radius * 1.3)
      return outArc.centroid(d)
    }
  },
  mounted () {
    this.initial()
    this.drawChart()
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/base/variables';

.vw-chart {
  &--pie {
    /deep/ svg {
      overflow: visible;
    }
  }
  &__wrapper {
    display: flex;
    flex: 1 0 auto;
    align-items: center;
    justify-content: center;
  }
  /deep/ &__slice {
    transition: all 0.3s ease;
    &--selected {
      transform: scale(1.05);
    }
  }
  /deep/ &__label {
    pointer-events: none;
    transition: all 0.3s ease;
    &--hide {
      opacity: 0;
    }
  }
  &__legend {
    &-list {
      padding-left: 3rem;
      @media screen and (max-width: 1440px) {
        padding-left: 2rem;
      }
    }
    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 1.25rem;
    }
    &-color {
      width: 1.5rem;
      height: 1rem;
      border-radius: 0.125rem;
    }
    &-label {
      font-size: 0.6875rem;
      padding-left: 0.5rem;
    }
  }
}
</style>
