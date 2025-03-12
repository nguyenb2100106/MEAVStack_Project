<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh sách nhân viên
        <i class="fas fa-users"></i>
      </h4>
      <StaffList
        v-if="filteredStaffsCount > 0"
        :staffs="filteredStaffs"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có nhân viên nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary w-auto" @click="refreshList">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success w-auto" @click="goToAddStaff">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger w-auto" @click="removeAllStaffs">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeStaff">
        <h4>
          Chi tiết nhân viên
          <i class="fas fa-user"></i>
        </h4>
        <StaffCard :staff="activeStaff" />
        <router-link
          :to="{ name: 'staff.edit', params: { id: activeStaff._id } }"
        >
          <span class="mt-2 badge bg-warning">
            <i class="fas fa-edit"></i> Chỉnh sửa
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import StaffCard from "@/components/StaffCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import StaffList from "@/components/StaffList.vue";
import StaffService from "@/services/staff.service";

export default {
  components: {
    StaffCard,
    InputSearch,
    StaffList,
  },
  data() {
    return {
      staffs: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    staffStrings() {
      return this.staffs.map((staff) => {
        const { name, username, position, address, phone } = staff;
        return [name, username, position, address, phone].join("");
      });
    },
    filteredStaffs() {
      if (!this.searchText) return this.staffs;
      return this.staffs.filter((_staff, index) =>
        this.staffStrings[index].includes(this.searchText)
      );
    },
    activeStaff() {
      if (this.activeIndex < 0) return null;
      return this.filteredStaffs[this.activeIndex];
    },
    filteredStaffsCount() {
      return this.filteredStaffs.length;
    },
  },
  methods: {
    async retrieveStaffs() {
      try {
        this.staffs = await StaffService.getAllStaff();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveStaffs();
      this.activeIndex = -1;
    },
    async removeAllStaffs() {
      if (confirm("Bạn muốn xóa tất cả nhân viên?")) {
        try {
          await StaffService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddStaff() {
      this.$router.push({ name: "staff.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
