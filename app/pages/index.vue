<script>
  export default {
    data () {
      return {
        'showPalette': false,
      }
    },
    'methods': {
      togglePalette () {
        this.showPalette = !this.showPalette
      },
    },
    'computed': {
      line () {
        const lines = [
          'This world is just a crappy game.',
          'As long as there\'s a way to win the game, the Blank will not lose.',
          'Chess is no different than tic-tac-toe.',
          'What kind of idiot gives his enemy time to act?',
          'The only universal justice in this world is cuteness!',
          'Don\'t you dare look down on humans.',
          'I ♥ Humanity',
          'The two of us will live as the weak, fight as the weak, and defeat the strong as only the weak can!',
          'There\'s no better observer than someone who distrusts you with all their heart.',
        ]
        const chosenIndex = Math.floor(Math.random() * lines.length)

        return lines[chosenIndex]
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import '../scss/mixins';

  .route-root {
    min-height: 100vh;

    > * {
      width: 100%;

      &:last-child {
        margin-top: auto;
      }
    }
  }

  .schemes {
    height: 5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    > * {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 5rem;
      min-height: 3rem;
    }
  }

  .panel {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    > * {
      width: 100%;
    }
  }

  .showcase-wrapper {
    display: flex;
    flex: 1;
    background-image: url('/dakgisi-jibril.png');
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;

    > * {
      width: 100%;
    }

    .showcase {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .backlink-wrapper {
    background: linear-gradient(130deg, #000FE5, #005FFF) !important;
    height: 5rem;
    display: flex;
    justify-content: center;
    color: white;

    > * {
      @include smart-padding(1rem);

      max-width: 945px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .backlink {
      > * {
        &:not(:last-child) {
          margin-right: 1rem;
        }
      }
    }
  }
</style>

<template lang="pug">
  .route-root
    .schemes.foldable(:class="{'folded': showPalette}")
      .colour-scheme-item.bg-pink
        p.text-white Pink
      .colour-scheme-item.bg-red
        p.text-white Red
      .colour-scheme-item.bg-purple
        p.text-white Purple
      .colour-scheme-item.bg-white
        p White
      .colour-scheme-item.bg-lightblue
        p Lightblue
      .colour-scheme-item.bg-yellow
        p Yellow

    .panel-wrapper
      .panel
        button.bg-purple.text-white(@click="") Start one text
        button.bg-red.text-white(@click="togglePalette") Toggle palette

    .showcase-wrapper
      .showcase
        .box.is-fullwidth.is-fullheight.is-maxwidth-5.is-maxheight-2.is-hcentered.is-vcentered
          .content
            p {{line}}

    .backlink-wrapper
      .backlink
        p Made by DecentM on the 31st of March, 2018
        a(
          href="https://blog.decentm.com/no-game-no-life-text-effect-css",
          rel="noopener",
          target="_blank"
        )
          button.is-brand Visit my blog!
</template>
