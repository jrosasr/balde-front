<template>
  <div class="max-w-7xl mx-auto p-4">
    <div class="flex justify-end">
      <ColorScheme>
        <USelect
          v-model="$colorMode.preference"
          :options="['system', 'light', 'dark']"
        />
      </ColorScheme>
    </div>
    <slot />
    <UNotifications />
  </div>
</template>