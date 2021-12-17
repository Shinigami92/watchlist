import 'quasar';

declare module 'quasar' {
  type QOptionsGroupOption<V = any> = Omit<
    NonNullable<QOptionGroupProps['options']>[0],
    'label' | 'value'
  > & {
    label: string;
    value: V;
  };
}
