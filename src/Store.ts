declare const my: any;

const appGlobal = global || {}
const globalRef = Object.getPrototypeOf(appGlobal) || appGlobal
const providers: { [index: string]: Object } = {};

export function getProvider<T>(providerName: string) {
  if (process.env.TARO_ENV === 'quickapp') {
    return globalRef[providerName] as T;
  } else if (process.env.TARO_ENV === 'alipay') {
    return my[providerName] as T;
  }
  return providers[providerName] as T;
}

export function setProvider<T extends Object>(context: T, providerName: string) {
  if (process.env.TARO_ENV === 'quickapp') {
    globalRef[providerName] = context;
  } else if (process.env.TARO_ENV === 'alipay') {
    my[providerName] = context;
  } else {
    providers[providerName] = context;
  }
}

export type createProviderContext<T> = () => T;

export function initProvider<T>(providerName: string, createContext: createProviderContext<T>) {
  let context = getProvider<T>(providerName);

  if (!context) {
    context = createContext();
    setProvider(context, providerName);
  }

  return context;
}
