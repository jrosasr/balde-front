<template>
  <div class="max-w-7xl mx-auto p-4">
    <div class="flex justify-end">
      <ColorScheme>
        <USelect
          v-model="$colorMode.preference"
          :options="['system', 'light', 'dark']"
        />
      </ColorScheme>
      <UButton @click="logout">Logout</UButton>
    </div>
    <slot />
    <UNotifications />
  </div>
</template>

<script setup>
import { useApiFetch } from "~/composables/useApiFetch";
const toast =  useToast();

const logout = async () => {
  // await useApiFetch("/sanctum/csrf-cookie");

  try {
    await useApiFetch("/logout", {
      method: "POST",
    });
    
    toast.add({ title: 'Sesión finalizada.' });
  } catch (error) {
    console.log(error)
  }

}
</script>