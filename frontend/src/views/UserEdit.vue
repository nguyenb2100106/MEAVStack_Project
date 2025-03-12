<template>
  <div v-if="user" class="page">
    <h4>Chỉnh sửa Độc giả</h4>
    <UserForm
      :user="user"
      @submit:user="updateUser"
      @delete:user="deleteUser"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import UserService from "@/services/user.service";

export default {
  components: {
    UserForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      user: null,
      message: "",
    };
  },
  methods: {
    async getUser() {
      const id = this.$route.params.id;
      if (!id) {
        console.error("Không tìm thấy ID!");
        return;
      }
      try {
        this.user = await UserService.getUser(id);
      } catch (error) {
        console.error(error);
        this.$router.push({ name: "notfound" });
      }
    },
    async updateUser(data) {
      try {
        await UserService.updateUser(this.user._id, data);
        alert("Độc giả đã được cập nhật thành công.");
        this.$router.push({ name: "users" });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteUser() {
      if (confirm("Bạn muốn xóa Độc giả này?")) {
        try {
          await UserService.deleteUser(this.user._id);
          this.$router.push({ name: "users" });
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
  created() {
    this.getUser(this.id);
  },
};
</script>
