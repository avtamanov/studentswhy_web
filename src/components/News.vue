<template lang="pug">
    .content-wrapper
        section
            .container
                .task-list__header
                    .ui-title-1 {{output_filter}}
                    .task-type__header
                        .buttons-list
                            .button.button--round.button-default(
                                @click="clickHeader_news"
                            ) Новости
                            .button.button--round.button-default(
                                @click="clickHeader_events"
                            ) События
                .task-list
                    .task-output_list-news(
                        v-if="output_filter === 'Новости'"
                    )
                        .task-item(v-for="item in serverNews")
                            .ui-card.ui-card--shadow(v-if="isNews(item) === true")
                                .ui-title-2 {{ item.header }}
                                .ui-text-regualr {{ item.content }}
                                //- .ui-text-small дата публикации: {{ item.publishDate }}
                            .ui-card.ui-card--shadow(v-if="isNews(item) === false")
                                .ui-title-2 {{ item.header }}
                                .ui-text-regualr {{ item.content }}
                                .ui-text-regualr Место проведения: {{ item.place }}
                                //- .ui-text-small дата публикации: {{ item.publishDate }}
                    .task-output_list-events(
                        v-if="output_filter === 'События'"
                    )
                        .task-item(
                            v-for="event in serverEvents"
                        )
                            .ui-card.ui-card--shadow
                                .ui-title-2 {{ event.header }}
                                .ui-text-regualr {{ event.content }}
                                .ui-text-regualr Место проведения: {{ event.place }}
                                //- .ui-text-small дата публикации: {{ event.publishDate }}

</template>

<script>
export default {
  data () {
    return {
      output_filter: 'Новости',
      serverNews: [],
      serverEvents: []
    }
  },
  methods: {
    isNews (item) {
      if (item.place) {
        return false
      }
      return true
    },
    clickHeader_news () {
      console.log('click header news')
      this.output_filter = 'Новости'
      this.$http.get(this.$store.getters.mainURL + 'res/virtual/news', {})
        .then(response => {
          console.log(response)
          if (response.statusText === 'OK') {
            console.log(response.statusText)
          } else {
            console.log(response.statusText)
          }
          // reset fields
          this.serverNews = response.body.items
        })
    },
    clickHeader_events () {
      console.log('click header events')
      this.output_filter = 'События'
      this.$http.get(this.$store.getters.mainURL + 'res/virtual/events', {})
        .then(response => {
          console.log(response)
          if (response.statusText === 'OK') {
            console.log(response.statusText)
          } else {
            console.log(response.statusText)
          }
          // reset fields
          this.serverEvents = response.body.items
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.task-list__header
    display flex
    justify-content space-between
    align-items center
    margin-bottom 30px
    .button
        margin-right 8px
    .ui-title-1
        margin-bottom 0
.task-item
    margin-bottom 8px
    &:last-child
        margin-bottom 0
.ui-card.ui-card--shadow
  .ui-title-4
    margin-top 10px
  .ui-text-small
    margin-top 5px
</style>
