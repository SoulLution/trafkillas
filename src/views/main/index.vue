<template>
  <container>
    <MasterElement>
      <ScrollShadowElement>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <Statistics />
            <Leaders />
          </v-col>
          <v-col cols="12" md="6">
            <News />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <Graph />
          </v-col>
        </v-row>
      </ScrollShadowElement>
    </MasterElement>
  </container>
</template>

<script>
import News from "./modules/News"
import Leaders from "./modules/Leaders"
import Statistics from "./modules/Statistics"
import Graph from "./modules/Graph"
export default {
  components: {
    News,
    Leaders,
    Statistics,
    Graph,
  },
}
</script>
