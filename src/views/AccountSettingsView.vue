<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import AccountSettings from '@/components/AccountSettingsAccount.vue'
import AccountSettingsSecurity from '@/components/AccountSettingsSecurity.vue'


const route = useRoute()
const activeTab = ref(route.params.tab)

// tabs
const tabs = [
  {
    title: 'Cuenta',
    icon: 'ri-group-line',
    tab: 'account',
  },
  {
    title: 'Seguridad',
    icon: 'ri-lock-line',
    tab: 'security',
  },
]
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
      :touch="false"
    >
      <!-- Account -->
      <VWindowItem value="account">
        <AccountSettings />
      </VWindowItem>
      <!-- Security -->
      <VWindowItem value="security">
        <AccountSettingsSecurity />
      </VWindowItem>

    </VWindow>
  </div>
</template>
