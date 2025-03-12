<template>
  <div class="page">
    <h4>Thêm Nhân Viên</h4>
    <StaffForm :staff="staff" @submit:staff="addStaff" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import StaffForm from "@/components/StaffForm.vue";
import StaffService from "@/services/staff.service";

export default {
  components: {
    StaffForm,
  },
  data() {
    return {
      staff: {
        name: "",
        username: "",
        password: "",
        position: "",
        address: "",
        phone_number: "",
        email: "",
      },
      message: "",
    };
  },
  methods: {
    async addStaff(data) {
      try {
        await StaffService.create(data);
        alert("Nhân viên đã được thêm thành công.");
        this.$router.push({ name: "staffs" });
      } catch (error) {
        console.error("Lỗi khi thêm nhân viên:", error.response || error);
        this.message = "Không thể thêm nhân viên. Vui lòng thử lại.";
      }
    },
  },
};
</script>
