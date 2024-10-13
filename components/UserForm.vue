<script setup>
import { z } from "zod";
const emit = defineEmits(["reload"]);

const auth = useAuthStore();
const general = useGeneralStore();
const isOpen = ref(false);
const showPassword = ref(false);
const errors = ref({});
const roles = ref([]);

const schema = z.object({
  email: z.string().email("Correo electrónico no válido"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  last_name: z.string().nullable(),
  role: z.enum(["admin", "reviewer"]),
});

const state = reactive({
  email: "",
  password: "",
  password_confirmation: "",
  name: "",
  last_name: "",
  role: "",
});

async function onSubmit(event) {
  const url = event.data.id ? `/api/users/${event.data.id}` : "/api/users";

  const { data, error, status } = await useApiFetch(url, {
    method: event.data.id ? "PUT" : "POST",
    body: event.data,
  });

  const evalResult = general.evaluateResponde({
    error,
    status,
    showSuccessMessage: true,
    customMessage: "Usuario creado correctamente.",
  });

  errors.value = typeof evalResult === "object" ? evalResult : { ...{} };

  if (Object.keys(errors.value).length === 0 && status.ok) {

    if (!event.data.id) {
      const { data } = await useFetch('/api/sendEmail', {
        method: 'POST',
        body: {
          email: state.email,
          name: state.name,
          password: state.password
        }
      })
    }

    errors.value = {};
    Object.assign(state, reactive({}));

    isOpen.value = false;
    emit("reload");
  }
}

/**
 * Switches the showPassword state.
 *
 * This function is used in the password input to show/hide the password.
 * It is triggered when the user clicks on the eye icon.
 */
function switchShowPassword() {
  showPassword.value = !showPassword.value;
}

function loadData(data) {
  isOpen.value = true;
  Object.assign(state, { ...data });
}

defineExpose({
  loadData,
});

onMounted(async () => {
  await nextTick(async () => {});

  const { data } = await useApiFetch("/api/get-roles");

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

    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <h3
              class="font-semibold text-base text-gray-900 dark:text-white leading-6"
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

          <UFormGroup
            label="Apellido(s)"
            name="last_name"
            :error="errors?.last_name"
          >
            <UInput v-model="state.last_name" />
          </UFormGroup>

          <UFormGroup label="Email" name="email" :error="errors?.email">
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Rol" name="role" :error="errors?.role">
            <USelect
              v-model="state.role"
              :options="roles"
              option-attribute="name"
            />
          </UFormGroup>

          <UDivider />

          <UFormGroup
            label="Contraseña"
            name="password"
            :error="errors?.password"
          >
            <template #hint>
              <UButton
                color="gray"
                variant="ghost"
                :icon="!showPassword ? 'i-lucide-eye' : 'i-lucide-eye-off'"
                class="cursor-pointer"
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

          <UDivider />

          <UButton type="submit" block>
            <span>{{ state.id ? "Actualizar" : "Crear" }}</span>
          </UButton>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
