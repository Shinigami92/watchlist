<template>
  <v-app>
    <v-app-bar app dense>
      <v-toolbar-title>Watchlist</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="createDialog">
        <template v-slot:activator="{ on }">
          <v-btn icon small v-on="on">
            <v-icon>add</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Add Serie</v-card-title>
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="createSerie.name" label="Name" clearable></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined @click="createDialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="addSerie()" :disabled="!createSerie.name">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-divider class="mx-3" inset vertical></v-divider>
      <v-hover v-slot:default="{ hover }">
        <v-btn class="mr-0" color="red" :icon="!hover" :small="!hover" :fab="hover" :x-small="hover" @click="exit()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-hover>
    </v-app-bar>
    <v-content>
      <v-data-table :headers="headers" :items="series" hide-default-footer>
        <template v-slot:item.name="{ item }">
          <v-edit-dialog :return-value.sync="item.name" large @save="persistStore()">
            {{ item.name }}
            <template v-slot:input>
              <v-text-field v-model="item.name" label="Edit" single-line></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.season="{ item }">
          <v-btn icon x-small @click="decrementSeason(item)">
            <v-icon>remove_circle_outline</v-icon>
          </v-btn>
          {{ item.season }}
          <v-btn icon x-small @click="incrementSeason(item)">
            <v-icon>add_circle</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.nextEpisode="{ item }">
          <v-btn icon x-small @click="decrementEpisode(item)">
            <v-icon>remove_circle_outline</v-icon>
          </v-btn>
          {{ item.nextEpisode }}
          <v-btn icon x-small @click="incrementEpisode(item)">
            <v-icon>add_circle</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.status="{ item }">
          <v-edit-dialog :return-value.sync="item.status" large @save="persistStore()">
            {{ item.status }}
            <template v-slot:input>
              <v-radio-group v-model="item.status">
                <v-radio label="Currently Watching" value="Currently Watching"></v-radio>
                <v-radio label="Plan to Watch" value="Plan to Watch"></v-radio>
              </v-radio-group>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.actions="{ index }">
          <v-btn icon small @click="removeSerie(index)">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Remote } from 'electron';
import { join } from 'path';
import Vue from 'vue';

const remote: Remote = window.require('electron').remote;
const { readFileSync, writeFileSync }: typeof import('fs') = remote.require('fs');

const enum Status {
  CURRENTLY_WATCHING = 'Currently Watching',
  PLAN_TO_WATCH = 'Plan to Watch'
}

interface Serie {
  name: string;
  season: number;
  nextEpisode: number;
  status: Status;
}

export default Vue.extend({
  name: 'app',
  data() {
    return {
      headers: [
        { value: 'name', text: 'Name' },
        { value: 'season', text: 'Season', align: 'end' },
        { value: 'nextEpisode', text: 'Next Episode', align: 'end' },
        { value: 'status', text: 'Status' },
        { value: 'actions', text: '', align: 'end', sortable: false }
      ],
      createDialog: false,
      createSerie: {} as Partial<Serie>,
      series: [] as Serie[]
    };
  },
  methods: {
    addSerie(): void {
      if (this.createSerie.name) {
        this.series.push({
          name: this.createSerie.name,
          season: 1,
          nextEpisode: 1,
          status: Status.PLAN_TO_WATCH
        });
      }
      this.createDialog = false;
    },
    decrementSeason(item: Serie): void {
      if (item.season > 1) {
        item.season--;
        this.persistStore();
      }
    },
    incrementSeason(item: Serie): void {
      item.season++;
      item.nextEpisode = 1;
      this.persistStore();
    },
    decrementEpisode(item: Serie): void {
      if (item.nextEpisode > 1) {
        item.nextEpisode--;
        this.persistStore();
      }
    },
    incrementEpisode(item: Serie): void {
      item.nextEpisode++;
      this.persistStore();
    },
    removeSerie(index: number): void {
      this.series.splice(index, 1);
      this.persistStore();
    },
    loadStore(): void {
      const file: string = join(this.userData(), 'store.json');
      try {
        const { series } = JSON.parse(readFileSync(file, 'utf8'));
        this.series = series;
      } catch (error) {}
    },
    persistStore(): void {
      const file: string = join(this.userData(), 'store.json');
      const payload: string = JSON.stringify({ series: this.series });
      writeFileSync(file, payload);
    },
    userData(): string {
      return remote.app.getPath('userData');
    },
    exit(): void {
      remote.app.exit();
    }
  },
  created() {
    this.loadStore();
  }
});
</script>

<style>
html {
  overflow-y: auto;
}

.v-app-bar {
  -webkit-app-region: drag;
}

.v-app-bar button {
  -webkit-app-region: no-drag;
}
</style>
