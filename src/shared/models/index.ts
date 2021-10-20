export const enum Status {
  CURRENTLY_WATCHING = 'Currently Watching',
  PLAN_TO_WATCH = 'Plan to Watch',
}

export interface Serie {
  name: string;
  season: number;
  nextEpisode: number;
  status: Status;
}

export interface UserPersistentStore {
  readonly series: Serie[];
}
