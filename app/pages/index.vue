<script>
  import axios from 'axios'

  const crappyClone = (payload) => JSON.parse(JSON.stringify(payload))

  export default {
    async asyncData () {
      let res = null

      try {
        res = await axios.head('https://blog.decentm.com/no-game-no-life-text-effect-css/')
      } catch (error) {
        res = null

        if (error.response) {
          res = error.response
        }
      }

      const postPublished = res.status !== 404
      const postStatus = res

      return {
        postPublished,
        postStatus,
      }
    },
    data () {
      return {
        'showPalette': false,
        'font':        true,
        'showing':     true,
        'countLimit':  6,
        'customText':  '',
      }
    },
    'methods': {
      toggle (item) {
        this[item] = !this[item]
      },
      validate (event) {
        const min = 1
        const max = 6
        const value = parseInt(event.target.value, 10)

        this.countLimit = Math.min(Math.max(value, min), max)

        return true
      },
    },
    'computed': {
      lines () {
        return [
          'This world is just a crappy game without rules.',
          'As long as there\'s a way to win, Blank won\'t lose.',
          'Chess is not different than tic-tac-toe.',
          'What kind of idiot gives his enemy time to act?',
          'The only universal justice in this world is cuteness!',
          'Don\'t you dare look down on humans, Chlammy.',
        ]
      },
      line () {
        const chosenIndex = Math.floor(Math.random() * this.lines.length)

        return this.lines[chosenIndex]
      },
      randomLines () {
        return (limit) => {
          const lines = crappyClone(this.lines)
          const selectedLines = []

          for (let i = 0; i < limit; i = i + 1) {
            const chosenIndex = Math.floor(Math.random() * lines.length)

            selectedLines.push(lines[chosenIndex])
            lines.splice(chosenIndex, 1)
          }

          return selectedLines
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import '../scss/mixins';
  @import '../scss/variables';

  .panel {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    > * {
      position: relative;
      width: 100%;
    }
  }

  .showcase-wrapper {
    background-image: url('/dakgisi-jibril.png');
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;

    > * {
      width: 100%;
    }
  }

  .ngnl-text-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
      flex: 1;
    }

    .ngnl-text-content {
      display: flex;
      white-space: nowrap;

      > * {
        width: 0;
        text-align: center;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      }

      &::before,
      &::after {
        opacity: 1;
        visibility: hidden;
        background-image: url('/corner.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: top left;
        display: block;
        min-height: 2rem;
        min-width: 2rem;
        content: '';
      }

      &::before {
        transform: translateY(-.5rem);
        align-self: flex-start;
      }

      &::after {
        transform: rotate(180deg) translateY(-.5rem);
        align-self: flex-end;
      }

      &.showing {
        &::before,
        &::after {
          @include ease-in(1s);

          visibility: visible;
          opacity: 0;
        }

        > * {
          @include ease-out(1s);

          width: 45rem;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }
      }
    }
  }

  .credits {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: rgba(0, 0, 0, .3);
    height: 4rem;
    width: 10rem;
    bottom: 5rem;
    right: 0;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 1rem;
  }

  @keyframes pulse {
    from {
      opacity: .40;
    }

    to {
      opacity: .85;
    }
  }

  .blog-link {
    > p {
      padding-right: 1rem;

      &::before {
        margin-right: .5rem;
        transform: translateY(2px);
        display: inline-block;
        width: 1rem;
        height: 1rem;
        content: '';
        background-color: map-get($colours, 'red');
        border-radius: 50%;
        animation-name: pulse;
        animation-duration: 2s;
        animation-timing-function: ease-in-out;
        animation-play-state: running;
        animation-iteration-count: infinite;
        animation-direction: alternate;
      }
    }

    > * {
      display: inline-block;
    }
  }
</style>

<template lang="pug">
  .route-root
    .schemes.row.is-wrapping.foldable.has-transition(:class="{'folded': showPalette}")
      .colour-scheme-item.bg-pink.is-hcentered.is-vcentered.is-minheight-3.is-minwidth-5
        p.text-white Pink
      .colour-scheme-item.bg-red.is-hcentered.is-vcentered.is-minheight-3.is-minwidth-5
        p.text-white Red
      .colour-scheme-item.bg-purple.is-hcentered.is-vcentered.is-minheight-3.is-minwidth-5
        p.text-white Purple
      .colour-scheme-item.bg-white.is-hcentered.is-vcentered.is-minheight-3.is-minwidth-5
        p White
      .colour-scheme-item.bg-lightblue.is-hcentered.is-vcentered.is-minheight-3.is-minwidth-5
        p Lightblue
      .colour-scheme-item.bg-yellow.is-hcentered.is-vcentered.is-minheight-3.is-minwidth-5
        p Yellow

    .panel-wrapper
      .panel.is-minheight-4
        button.bg-purple.text-white(@click="toggle('showing')") Show text: {{showing ? 'ON' : 'OFF'}}
        button.bg-yellow(@click="toggle('font')") Use font: {{font ? 'ON' : 'OFF'}}
        button.bg-red.text-white(@click="toggle('showPalette')") Show palette: {{showPalette ? 'ON' : 'OFF'}}
        button.bg-white
          label.is-vcentered.is-hcentered
            p.is-hcentered Count
            input(type="number", v-model="countLimit", min="1", max="6", @input="validate")

    .showcase-wrapper.spread(:class="{'font-ngnl': font}")
      .column
        .row.is-maxheight-2.is-hcentered
          input.is-maxwidth-50(type="text", placeholder="Write your custom text here", v-model="customText")
        .showcase.is-vcentered.is-hcentered
          .box.is-fullwidth.is-fullheight.is-maxwidth-50.is-maxheight-20.is-hcentered.is-vcentered.bg-white
            .content.text-pink
              no-ssr
                .ngnl-text-wrapper
                  .ngnl-text-content(v-if="customText", :class="{showing}")
                    h3 {{customText}}
                  .ngnl-text-content(v-else, v-for="(line, index) in randomLines(countLimit)", :class="[{showing}, 'has-delay-' + index]")
                    h3 {{line}}
    .credits
      a.text-white(
        href="https://thekornk.deviantart.com/art/Jibril-No-Game-No-Life-639024930",
        target="_blank",
        rel="noopener nofollow"
      ) Jibril background
      a.text-white(
        href="https://japanyoshi.deviantart.com/art/No-Game-No-Life-Logo-Font-Free-DL-463798470",
        target="_blank",
        rel="noopener nofollow"
      ) Font face


    .backlink-wrapper
      .backlink
        p Made by DecentM on the 1st of April, 2018
        a(
          v-if="postPublished",
          href="https://blog.decentm.com/no-game-no-life-text-effect-css",
          rel="noopener",
          target="_blank"
        )
          button.is-brand Read how it's made!

        .blog-link(v-else)
          p I'm still writing the blog post. ({{postStatus.status}})
          a(
            href="https://blog.decentm.com/",
            rel="noopener",
            target="_blank"
          )
            button.is-brand Visit my blog!
</template>
