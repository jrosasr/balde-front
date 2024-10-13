<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
          <h1>Gestión de usuarios</h1>
          <UserForm ref="modalForm" @reload="getUsers" />
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
        class="flex justify-end border-gray-200 dark:border-gray-700 px-3 py-3.5 border-t"
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

const modalForm = ref(null);
const records = ref([]);

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Nombre",
    sortable: true,
  },
  {
    key: "email",
    label: "Correo electrónico",
    sortable: true,
  },
  {
    key: "role",
    label: "Rol",
  },
  {
    key: "date",
    label: "Fecha de creación",
    sortable: true,
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
      click: () => {
        modalForm.value.loadData(row);
      },
    },
  ],
  [
    {
      label: "Eliminar",
      icon: "i-lucide-trash",
      click: async () => {
        if (confirm("Esté seguro de eliminar este registro?")) {
          await general.deleteRecord(`/api/users/${row.id}`);
          await getUsers();
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
      role: user.roles[0].name,
      date: general.formatDate(user.created_at),
    };
  });
}

onMounted(async () => {
  await getUsers();
});
</script>
