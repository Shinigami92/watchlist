import type { UserPersistentStore } from './models';

export interface WatchlistElectronApi {
  loadStore(): Promise<UserPersistentStore>;
  persistStore(payload: string): Promise<void>;
  close(): void;
}
