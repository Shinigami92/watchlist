import { boot } from 'quasar/wrappers';
import messages from 'src/i18n';
import type { I18n } from 'vue-i18n';
import { createI18n } from 'vue-i18n';

interface I18nTranslation {
  failed: string;
  success: string;
}

const i18n: I18n<{ 'en-US': I18nTranslation }, unknown, unknown, true> =
  createI18n({
    locale: 'en-US',
    messages,
  });

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
});

export { i18n };
