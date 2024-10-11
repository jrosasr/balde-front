import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const toast = useToast();
  const user = ref(null);

  const isLoggedIn = computed(() => !!user.value);

  const isAdmin = computed(
    () => user.value && user.value.roles && user.value.roles[0].name === "admin"
  );
  const isReviewer = computed(
    () =>
      user.value && user.value.roles && user.value.roles[0].name === "reviewer"
  );

  async function fetchUser() {
    const result = await useApiFetch("/api/user-authenticated");
    user.value = result?.data?.user;
  }

  async function logout() {
    const token = useCookie("XSRF-TOKEN");

    try {
      await useApiFetch("/logout", {
        method: "POST",
      });

      user.value = null;
      token.value = null;
      navigateTo("/signin");
    } catch (error) {
      console.log(error);
    }
  }

  async function loginWithPassword(credentials) {
    await useApiFetch("/sanctum/csrf-cookie");

    try {
      const { data, error, status } = await useApiFetch("/login", {
        method: "POST",
        body: credentials,
      });

      await fetchUser();
      navigateTo("/");
      return { data, error, status };

    } catch (error) {
      console.log("err loginWithPassword", error);
    }
  }

  return {
    user,
    loginWithPassword,
    isLoggedIn,
    fetchUser,
    logout,
    isAdmin,
    isReviewer,
  };
});
