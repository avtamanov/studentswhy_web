<template lang="pug">
  .content-wrapper
    section
      .container
        .impinfo-header
          .ui-title-1 Полезная информация
        .buttons-list
          .button.button--round.button-default(@click="clickHeader_studentsWhy") Почемучник
          .button.button--round.button-default(@click="menuFilter = 'Преподаватели'") Преподаватели
          .button.button--round.button-default(@click="clickHeader_disciplines") Дисциплины
        .prepods-section(v-if="menuFilter === 'Преподаватели'")
          .ui-title-2 Преподаватели
          .buttons-list
            .button.button--round.button-default(@click="loadAllTutors") Все преподаватели
            //- .button.button--round.button-default(
            //-    @click="tutors_output_filter = 'Search'"
            //-   ) Поиск по имени
          //- .task-input(v-if="tutors_output_filter === 'Search'")
          //-   .ui-title-4 Поиск преподавателя
          //-   input(type="text", placeholder="ФИО", v-model="tutorName")
          //-   button(class="btn btn-primary", @click="findTutor") Поиск
          .task-output(v-if="tutors_output_filter === 'All'")
            .task-item(v-for="tutor in showedTutors")
              ul.ui-card.ui-card--shadow(class="list-group")
                li.ui-title-2(class="list-group-item") {{ tutor.name }}
                li.ui-text-regualr(class="list-group-item") Email: {{ tutor.emails }}
                li.ui-text-regualr(class="list-group-item") Телефон: {{ tutor.phone }}
                li.ui-text-regualr(class="list-group-item") Дициплины: {{ tutor.disciplines }}
                li.ui-text-regualr(class="list-group-item") Должность: {{ tutor.post }}
                li.ui-text-regualr Адрес: {{ tutor.adress }}
                li.ui-text-regualr Время пребывания: {{ tutor.attendTime }}
                li
                  a(class="list-group-item", :href='tutor.url')  {{ tutor.url }}.
                img(class="list-group-item", :src="tutor.imgURL")
        .questions-section(v-if="menuFilter === 'Почемучник'")
          .ui-title-2 Почемучник
          TreeBrowser(
              :node="root_why"
              )
        .disciplines-section(v-if="menuFilter === 'Дисциплины'")
          .ui-title-2 Дисциплины
          TreeBrowser(
              :node="root_discip"
              )
</template>

<script>
import TreeBrowser from '@/components/TreeBrowser'

export default {
  components: {
    TreeBrowser
  },
  data () {
    return {
      root_why: {
        id: 'ha',
        leaves: [],
        nodes: [
          {
            id: 'haha',
            leaves: [],
            nodes: []
          },
          {
            id: 'hehe',
            leaves: [],
            nodes: []
          }
        ]
      },
      root_discip: {},
      root_tutors: {},
      //
      menuFilter: '',
      tutors_output_filter: 'Search',
      tutorName: '',
      tutorNameURL: '',
      // showedTutors: [],
      cur_tutors: [],
      serverTags: [],
      serverInfo: []
    }
  },
  computed: {
    showedTutors () {
      return this.$store.getters.get_tutors
    }
  },
  methods: {
    clickHeader_studentsWhy () {
      console.log('click header studentsWhy')
      this.menuFilter = 'Почемучник'
      this.$http.get(this.$store.getters.mainURL + 'res/virtual/studentsWhy/tags', {})
        .then(response => {
          console.log(response)
          if (response.statusText === 'OK') {
            console.log(response.statusText)
            this.root_why = response.body.root
            console.log('root')
            console.log(this.root_why)
          } else {
            console.log(response.statusText)
          }
        })
    },
    clickHeader_disciplines () {
      console.log('click header disciplines')
      this.menuFilter = 'Дисциплины'
      this.$http.get(this.$store.getters.mainURL + 'res/virtual/programs/disciplines', {})
        .then(response => {
          console.log(response)
          if (response.statusText === 'OK') {
            console.log(response.statusText)
          } else {
            console.log(response.statusText)
            this.root_why = response.body.root
            console.log('root')
            console.log(this.root)
          }
          // reset fields
          // this.serverTags = response.body.items
        })
    },
    loadAllTutors () {
      this.tutors_output_filter = 'All'
      this.$http.get(this.$store.getters.mainURL + 'res/virtual/programs/tutors/')
        .then(response => {
          console.log(response)
        })
    }
    // ,
    // findTutor () {
    //   this.$http.get(this.$store.getters.mainURL + 'res/virtual/programs/tutors/')
    //     .then(response => {
    //       return response.json()
    //     })
    //     .then(someShit => {
    //       console.log('OK')
    //       this.cur_tutors = someShit.root.nodes[2].nodes[0].leaves
    //       console.log(this.cur_tutors)
    //     })
    //   for (var tutor in this.cur_tutors) {
    //     console.log(tutor)
    //     if (this.cur_tutors[tutor].id === this.tutorName) {
    //       //
    //       console.log('found')
    //       this.tutorNameURL = this.tutorName.replace(' ', '%20')
    //       this.tutorNameURL = this.tutorNameURL.replace(' ', '%20')
    //       console.log(this.$store.getters.mainURL + 'res/virtual/programs/tutors/' + this.tutorName)
    //       this.$http.get(this.$store.getters.mainURL + 'res/virtual/programs/tutors/' + this.tutorName)
    //         .then(response => {
    //           return response.json()
    //         })
    //         .then(someShit => {
    //           this.showedTutors = [tutor]
    //         })
    //       //
    //       break
    //     }
    //   }
    // }
  }
}
</script>

<style lang="stylus" scoped>
.task-item
  display flex-table-column
.buttons-list
  .button
    margin-right 8px
.task-input
  margin-bottom 10px
.buttons-list
  margin-bottom 20px
</style>
