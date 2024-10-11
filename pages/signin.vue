<template>
  <UContainer class="max-w-md">
    <UCard class="mt-10">
      <h1 class="text-2xl">Inicio de sesión</h1>

      <form @submit.prevent="handleSubmit" class="space-y-4">
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

        <UFormGroup label="Contraseña" :error="errors?.password">
          <template #hint>
            <div class="space-x-2 flex">
              <UIcon
                name="i-lucide-eye"
                class="cursor-pointer"
                v-if="!showPassword"
                @click="showPassword = !showPassword"
              />
              <UIcon
                name="i-lucide-eye-off"
                class="cursor-pointer"
                v-else
                @click="showPassword = !showPassword"
              />
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
import { useApiFetch } from "~/composables/useApiFetch";

definePageMeta({
  middleware: ["guest"],
});

const toast = useToast();
const auth = useAuthStore();
const general = useGeneralStore();
const errors = reactive({});
const showPassword = ref(false);

const payload = reactive({
  email: "admin@example.com",
  password: "password",
});

const handleSubmit = async () => {
  await useApiFetch("/sanctum/csrf-cookie");

  try {
    const { data, error, status } = await auth.loginWithPassword(payload);

    general.evaluateResponde({
      data,
      error,
      status,
      showSuccessMessage: true,
      customMessage: "¡Bienvenido!",
    });
  } catch (error) {
    console.log("ee1", error);
  }
};

function manageErrors(error) {
  if (error.statusCode === 401) {
    toast.add({ title: "Acceso no autorizado", color: "red", timeout: 1500 });
  }

  if (error.statusCode === 409) {
    toast.add({ title: "Error en el servidor", color: "red", timeout: 1500 });
  }

  if (error.statusCode === 422) {
    const errs = error.data.errors;

    Object.keys(errs).forEach((key) => {
      errors[key] = errs[key][0];
    });
  }
}
</script>
