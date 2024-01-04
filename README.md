# daily-use

## Document & Online preview

[daily use](https://github.com/armin926/dailyuse)

## Install & Use

```bash
pnpm i vue-daily-use
# or
npm i vue-daily-use
# or
yarn add vue-daily-use
```

Import and register component

**Global**

```ts
import { createApp } from 'vue'
import App from './App.vue'

import VueDailyUse from 'vue-daily-use'
import 'vue-daily-use/css'

const app = createApp(App)
app.use(VueDailyUse)
```

**Local**

```vue
<script setup lang="ts">
import { useMessage } from 'vue-daily-use'
import 'vue-daily-use'
</script>
```

## project

- Get the project code

```sh
git clone https://github.com/armin926/dailyuse.git
```

- Install dependencies

```shell
cd dailyuse

pnpm i
```

- Run project

```shell
pnpm dev
```
