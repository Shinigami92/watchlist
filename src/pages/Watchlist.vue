<template lang="pug">
q-dialog(v-model="createDialog", persistent)
  q-card
    q-card-section
      .text-h6 Add Serie

    q-card-section.row.items-center
      q-input(v-model="createSerie.name", label="Name", clearable, outlined)

    q-card-actions(align="right")
      q-btn(label="Cancel", flat, color="primary", v-close-popup)
      q-btn(
        label="Add",
        flat,
        color="primary",
        :disabled="!createSerie.name",
        @click="addSerie()"
      )

q-page
  q-table(
    v-model:pagination="pagination",
    style="height: calc(100vh - 32px)",
    flat,
    :columns="columns",
    :rows="filteredSeries",
    row-key="name",
    virtual-scroll,
    :rows-per-page-options="[0]"
  )
    template(#top)
      q-btn(
        label="Add Serie",
        color="primary",
        icon="mdi-plus",
        @click="createDialog = true"
      )

      q-space

      q-input(
        v-model="search",
        type="search",
        label="Search",
        clearable,
        dense,
        outlined
      )
        template(#append)
          q-icon(name="mdi-magnify")

    template(#body-cell-name="props")
      q-td(:props="props")
        span(v-text="props.value")
        q-popup-edit(v-model="props.row.name", auto-save, v-slot="scope")
          q-input(
            v-model="scope.value",
            label="Name",
            counter,
            autofocus,
            @keyup.enter="scope.set"
          )

    template(#body-cell-season="props")
      q-td(:props="props")
        q-btn(
          icon="mdi-minus",
          outline,
          size="xs",
          round,
          color="primary",
          @click="decrementSeason(props.key)"
        )
        span.q-mx-sm(v-text="props.value")
        q-btn(
          icon="mdi-plus",
          outline,
          size="xs",
          round,
          color="primary",
          @click="incrementSeason(props.key)"
        )

    template(#body-cell-nextEpisode="props")
      q-td(:props="props")
        q-btn(
          icon="mdi-minus",
          outline,
          size="xs",
          round,
          color="primary",
          @click="decrementEpisode(props.key)"
        )
        span.q-mx-sm(v-text="props.value")
        q-btn(
          icon="mdi-plus",
          outline,
          size="xs",
          round,
          color="primary",
          @click="incrementEpisode(props.key)"
        )

    template(#body-cell-status="props")
      q-td(:props="props")
        span(v-text="props.value")
        q-popup-edit(v-model="props.row.status", auto-save, v-slot="scope")
          q-option-group(
            v-model="scope.value",
            type="radio",
            :options="statusOptions"
          )

    template(#body-cell-actions="props")
      q-td(:props="props")
        q-btn(
          flat,
          color="negative",
          icon="mdi-delete",
          @click="removeSerie(props.key)"
        )
</template>

<script lang="ts">
import type { QOptionsGroupOption, QTableProps } from 'quasar';
import type { Serie, UserPersistentStore } from 'src/shared/models';
import { Status } from 'src/shared/models';
import type { ComputedRef, Ref } from 'vue';
import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue';

export default defineComponent({
  name: 'Watchlist',
  setup() {
    const columns: Array<NonNullable<QTableProps['columns']>[0]> = [
      {
        name: 'name',
        label: 'Name',
        field: (row) => row.name,
        align: 'left',
        sortable: true,
      },
      {
        name: 'season',
        label: 'Season',
        field: (row) => row.season.toString(),
        sortable: true,
      },
      {
        name: 'nextEpisode',
        label: 'Next Episode',
        field: (row) => row.nextEpisode.toString(),
        sortable: true,
      },
      {
        name: 'status',
        label: 'Status',
        field: (row) => row.status,
        sortable: true,
      },
      {
        name: 'actions',
        label: '',
        field: () => '',
      },
    ];

    const series: Ref<Serie[]> = ref([]);

    const pagination: Ref<{ rowsPerPage: number }> = ref({ rowsPerPage: 0 });

    const createDialog: Ref<boolean> = ref(false);
    const createSerie: Ref<Partial<Serie>> = ref({});

    const statusOptions: Array<QOptionsGroupOption<Status>> = [
      { label: Status.CURRENTLY_WATCHING, value: Status.CURRENTLY_WATCHING },
      { label: Status.PLAN_TO_WATCH, value: Status.PLAN_TO_WATCH },
    ];

    const search: Ref<string | null> = ref(null);

    const filteredSeries: ComputedRef<Serie[]> = computed(() => {
      const searchLowerCaseValue: string = search.value?.toLowerCase() ?? '';
      return series.value.filter((serie) =>
        serie.name.toLowerCase().includes(searchLowerCaseValue)
      );
    });

    const findSerie: (name: string) => Serie | undefined = (name) =>
      series.value.find((serie) => serie.name === name);

    const addSerie: () => void = () => {
      if (createSerie.value.name) {
        series.value.push({
          name: createSerie.value.name,
          season: 1,
          nextEpisode: 1,
          status: Status.PLAN_TO_WATCH,
        });
        createSerie.value = {};
      }
      createDialog.value = false;
    };

    const removeSerie: (name: string) => void = (name) => {
      const index: number = series.value.findIndex(
        (serie) => serie.name === name
      );
      series.value.splice(index, 1);
    };

    const incrementSeason: (name: string) => void = (name) => {
      const serie: Serie | undefined = findSerie(name);
      if (serie) {
        serie.season++;
        serie.nextEpisode = 1;
      }
    };

    const decrementSeason: (name: string) => void = (name) => {
      const serie: Serie | undefined = findSerie(name);
      if (serie && serie.season > 1) {
        serie.season--;
      }
    };

    const incrementEpisode: (name: string) => void = (name) => {
      const serie: Serie | undefined = findSerie(name);
      if (serie) {
        serie.nextEpisode++;
      }
    };

    const decrementEpisode: (name: string) => void = (name) => {
      const serie: Serie | undefined = findSerie(name);
      if (serie && serie.nextEpisode > 1) {
        serie.nextEpisode--;
      }
    };

    onBeforeMount(async () => {
      const store: UserPersistentStore = await window.electron.loadStore();
      series.value = store.series;
    });

    watch(
      series,
      async (value) => {
        await window.electron.persistStore(JSON.stringify({ series: value }));
      },
      { deep: true }
    );

    return {
      columns,
      pagination,
      search,
      filteredSeries,
      createDialog,
      createSerie,
      addSerie,
      removeSerie,
      incrementSeason,
      decrementSeason,
      incrementEpisode,
      decrementEpisode,
      statusOptions,
    };
  },
});
</script>
