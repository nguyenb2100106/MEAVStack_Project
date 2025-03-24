<template>
  <div v-if="staff" class="page">
    <h4>Chỉnh sửa thông tin Nhân viên</h4>
    <StaffForm
      :staff="staff"
      @submit:staff="updateStaff"
      @delete:staff="deleteStaff"
    />
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
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      staff: null,
      message: "",
    };
  },
  methods: {
    async getStaff() {
      const id = this.$route.params.id;
      if (!id) {
        console.error("Không tìm thấy ID!");
        return;
      }
      try {
        this.staff = await StaffService.getStaffById(id);
      } catch (error) {
        console.error(error);
        this.$router.push({
          name: "notfound",
          params: { pathMatch: this.$route.path.split("/").slice(1) },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateStaff(data) {
      try {
        await StaffService.updateStaff(this.staff._id, data);
        alert("Nhân viên được cập nhật thành công.");
        this.$router.push({ name: "staffs" });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteStaff() {
      if (confirm("Bạn muốn xóa Nhân viên này?")) {
        try {
          await StaffService.deleteStaff(this.staff._id);
          this.$router.push({ name: "staffs" });
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
  created() {
    this.getStaff(this.id);
    this.message = "";
  },
};
</script>
