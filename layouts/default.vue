<template>
  <div class="max-w-7xl mx-auto p-4">
    <div class="flex justify-between">
      <h1 class="text-2xl">
        {{ auth.isLoggedIn ? auth.user.full_name : '' }}
        <span v-if="auth.isLoggedIn" class="text-gray-500">({{ auth.isAdmin ? 'Admin' : 'Reviewer' }})</span>
      </h1>
      <div class="flex space-x-2">
        <ColorScheme>
        <USelect
          v-model="$colorMode.preference"
          :options="['system', 'light', 'dark']"
        />
      </ColorScheme>
      <UButton v-if="auth.isLoggedIn" @click="logout">
        Logout
        <UIcon name="i-lucide-log-out" />
      </UButton>
      </div>
    </div>
    <slot />
    <UNotifications />
  </div>
</template>

<script setup>
import { useApiFetch } from "~/composables/useApiFetch";
const toast =  useToast();
const auth = useAuthStore();

const logout = async () => {
  await auth.logout();
  
  toast.add({ title: "Sesión finalizada.", timeout: 2000 });

}
</script>