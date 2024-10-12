<script setup>
import { z } from "zod";

const auth = useAuthStore();
const isOpen = ref(false);

const roles = [
  {
    name: "Administrador",
    value: "admin",
  },
  {
    name: "Revisor",
    value: "reviewer",
  },
];

const schema = z.object({
  email: z.string().email("Correo electrónico no válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  last_name: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  role: z.enum(["admin", "reviewer"]),
});

const state = reactive({
  email: undefined,
  password: undefined,
  name: undefined,
  last_name: undefined,
  role: undefined
});

async function onSubmit(event) {
  // Do something with data
  console.log(event.data);
}
</script>

<template>
  <div>
    <UButton v-if="auth.isAdmin" @click="isOpen = true">
      Crear
      <UIcon name="i-lucide-plus" />
    </UButton>

    <UModal v-model="isOpen" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Usuario
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="Nombre(s)" name="name">
            <UInput v-model="state.name" />
          </UFormGroup>

          <UFormGroup label="Apellido(s)" name="last_name">
            <UInput v-model="state.last_name" />
          </UFormGroup>

          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>

          <UFormGroup label="Rol" name="role">
            <USelect v-model="state.role" :options="roles" option-attribute="name" />
          </UFormGroup>

          <UButton type="submit"> Submit </UButton>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
