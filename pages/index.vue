<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
          <h1>Gestión de usuarios</h1>
          <!-- <ColorScheme>
            <USelect
              v-model="$colorMode.preference"
              :options="['system', 'light', 'dark']"
            />
          </ColorScheme> -->
          <UserForm />
        </div>
      </template>
      <UTable :columns="columns" :rows="rows">
        <template #id-data="{ row }">
          <span>#{{ row.id }}</span>
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="actions(row)" v-if="auth.isAdmin">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="records.length"
        />
      </div>
    </UCard>
  </UContainer>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

const general = useGeneralStore();
const auth = useAuthStore();

const records = ref([]);

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Nombre",
  },
  {
    key: "email",
    label: "Correo electrónico",
  },
  {
    key: "rol",
    label: "Rol",
  },
  {
    key: "date",
    label: "Fecha de creación",
  },
  {
    key: "actions",
    label: "",
  },
];

const actions = (row) => [
  [
    {
      label: "Editar",
      icon: "i-lucide-pencil",
      click: () => console.log("Edit", row.id),
    },
  ],
  [
    {
      label: "Eliminar",
      icon: "i-lucide-trash",
      click: async () => {
        if (confirm('asdas')) {
          await general.deleteRecord(`/api/users/${row.id}`)
          await getUsers()
        }
      },
    },
  ],
];

const page = ref(1);
const pageCount = 10;

const rows = computed(() => {
  return records.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});

async function getUsers() {
  const { data, error, status } = await useApiFetch("/api/users");

  records.value = data.users.map((user) => {
    return {
      ...user,
      rol: user.roles[0].name,
      date: general.formatDate(user.created_at),
    };
  });
}

onMounted(async () => {
  await getUsers()
});
</script>
