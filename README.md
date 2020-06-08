# taro-provider

Taro-provider is a helper library to easily use `react` `createContext` hooks in tara application.

Since there is no root component in `mini-program`, each page will be rendered in a different context. It is hard to use `provider` in taro application. A possible solution is that: store provider context in global object and then restore it in each page. Official `@tarojs/redux` takes this workaround solution. However, there are few hacks in `taro-cli` to implement this solution. It's not easy for people to create our own provider. This is why we created this library

hack solution in `taro-cli` under https://github.com/NervJS/taro/blob/e0166b508ed997cc0a2bddcb478a5f4b1888ffe5/packages/taro-transformer-wx/src/index.ts#L851

## Installation

Using npm:

```sh
$ npm install --save taro-provider
```

Using yarn:

```sh
$ yarn add taro-provider
```

## Example

### createProvider


```jsx
// GroupsProvider.ts
import { createProvider } from 'taro-provider';

interface IGroupsContext {
  getGroups(): Object[];
  getGroup(groupUuid: string): Object | undefined;
};

export const GroupsProviderContextName = 'GroupsProvider';

export const GroupsProvider = createProvider<IGroupsContext>({
  name: GroupsProviderContextName,
  create() {
    return {
      getGroups() {
        return [{
          uuid: 'xxxx',
          name: 'Group Name'
        }]
      },

      getGroup(groupUuid: string) {
        return {
          uuid: 'xxxx',
          name: 'Group Name'
        };
      },
    };
  }
})
```

### init Provider in app.tsx
```jsx
import Taro, { Component, Config } from '@tarojs/taro'
import { GroupsProvider } from './providers/GroupsProvider';
import Index from './pages/home/index'

// init group provider
GroupsProvider.init();

class App extends Component {
  render() {
    return (
      <GroupsProvider.Provider>
        <Index />
      </GroupsProvider.Provider>
    );
  }
}
```

### use Provider in pages

```jsx
/// groups.tsx
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

import { GroupsProvider } from '../../providers';
import GroupView from '../../components/Group';

import './index.css'

export default function Groups() {
  const { getGroups } = GroupsProvider.useProvider();
  const groups = getGroups();

  return (
    <View className={cxClassName}>
      { groups.map(group => {
          return <GroupView key={group.uuid} {...group} />
        })
      }
    </View>
  );
}

Groups.config = {
  navigationBarTitleText: 'Groups'
}

```


## Contributing

Please feel free to submit any issues or pull requests.

## License

MIT
