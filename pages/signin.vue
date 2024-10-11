<template>
  <UContainer class="max-w-md">
    <UCard class="mt-10">
      <h1 class="text-2xl">Inicio de sesión</h1>

      <form @submit.prevent="loginMethod" class="space-y-4">
        <UFormGroup
          v-slot="{ error }"
          label="Correo electrónico"
          :error="errors?.email"
        >
          <UInput
            v-model="payload.email"
            type="email"
            icon="i-lucide-mail"
            placeholder="Introduce tu correo"
            :trailing-icon="error ? 'i-lucide-triangle-alert' : undefined"
          />
        </UFormGroup>

        <UFormGroup label="Contraseña"
          :error="errors?.password">
          <template #hint>
            <div class="space-x-2 flex">
              <UIcon name="i-lucide-eye" class="cursor-pointer" v-if="!showPassword" @click="showPassword = !showPassword" />
              <UIcon name="i-lucide-eye-off" class="cursor-pointer" v-else @click="showPassword = !showPassword" />
            </div>
          </template>
          <template #default>
            <UInput
              v-model="payload.password"
              placeholder="1234"
              icon="i-lucide-key-round"
              :type="showPassword ? 'text' : 'password'"
            />
          </template>
        </UFormGroup>

        <UButton type="submit" color="primary" class="w-full">
          <span class="mx-auto">Iniciar sesión</span>
        </UButton>
      </form>
    </UCard>
  </UContainer>
</template>

<script setup>
const errors = reactive({});
const showPassword = ref(false);

const payload = reactive({
  email: "admin@example.com",
  password: "password",
});

const loginMethod = () => {
  console.log(payload);
};
</script>
