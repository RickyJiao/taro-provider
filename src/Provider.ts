import { createContext, useContext } from '@tarojs/taro';
import { initProvider } from './Store';

type TaroProvider<T> = Taro.ComponentClass<{ value?: T }>;

type ProviderFn<T> = () => T;

type ProviderProps<T> = {
  name: string;
  create: ProviderFn<T>;
}

export type Provider<T> = {
  init: ProviderFn<T>;
  getContext: () => Taro.Context<T>;
  useProvider: ProviderFn<T>;
  Provider: TaroProvider<T>
}

export function createProvider<T>({ name, create }: ProviderProps<T>): Provider<T> {
  const taroContext = createContext<T>({} as T);

  class ProviderComponent { }

  return {
    init() {
      const context = initProvider(name, create);

      if (taroContext.Provider) {
        // instance provider
        (taroContext.Provider as any)(context);

        // set the context
        (taroContext.Provider as any)(context);
      }

      return context;
    },
    getContext() {
      return taroContext
    },
    useProvider() {
      return useContext(taroContext);
    },
    Provider: (ProviderComponent as TaroProvider<T>)
  }
}
