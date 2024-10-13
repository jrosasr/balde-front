<script setup>
import { z } from "zod";

const auth = useAuthStore();
const general = useGeneralStore();
const isOpen = ref(false);
const showPassword = ref(false);
const errors = reactive({});
const roles = ref([]);

const schema = z.object({
  email: z.string().email("Correo electrónico no válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  password_confirmation: z
    .string()
    .min(8, "La confirmación debe tener al menos 8 caracteres"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  last_name: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  role: z.enum(["admin", "reviewer"]),
});

const state = reactive({
  email: undefined,
  password: undefined,
  password_confirmation: undefined,
  name: undefined,
  last_name: undefined,
  role: undefined,
});

async function onSubmit(event) {
  // Do something with data
  console.log(event.data);
  Object.assign(errors, {});
  nextTick(async () => {})

  const { data, error, status } = await useApiFetch("/api/users", {
    method: "POST",
    body: event.data,
  })

  Object.assign(errors, general.evaluateResponde({
      error,
      status,
      showSuccessMessage: true,
      customMessage: "Usuario creado correctamente.",
    }) ?? {})
}

function switchShowPassword() {
  showPassword.value = !showPassword.value;
}

onMounted(async () => {
  await nextTick(async () => {});

  const { data, error, status } = await useApiFetch("/api/get-roles");
  console.log(data);

  data.forEach((element) => {
    roles.value.push({ name: element.name, value: element.name });
  });
});
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
          <UFormGroup label="Nombre(s)" name="name" :error="errors?.name">
            <UInput v-model="state.name" />
          </UFormGroup>

          <UFormGroup label="Apellido(s)" name="last_name" :error="errors?.last_name">
            <UInput v-model="state.last_name" />
          </UFormGroup>

          <UFormGroup label="Email" name="email" :error="errors?.email">
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Contraseña" name="password" :error="errors?.password">
            <template #hint>
              <UButton
                color="gray"
                variant="ghost"
                :icon="!showPassword ? 'i-lucide-eye' : 'i-lucide-eye-off'"
                class="cursor-pointer z-10"
                @click="switchShowPassword"
              ></UButton>
            </template>
            <UInput
              v-model="state.password"
              :type="showPassword ? 'text' : 'password'"
            >
            </UInput>
          </UFormGroup>

          <UFormGroup
            label="Confirmación de contraseña"
            name="password_confirmation"
          >
            <UInput
              v-model="state.password_confirmation"
              :type="showPassword ? 'text' : 'password'"
            />
          </UFormGroup>

          <UFormGroup label="Rol" name="role" :error="errors?.role">
            <USelect
              v-model="state.role"
              :options="roles"
              option-attribute="name"
            />
          </UFormGroup>

          <UButton type="submit" block>Submit</UButton>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
