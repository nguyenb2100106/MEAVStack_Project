<template>
  <div class="container mt-3">
    <h4 class="text-center">Đơn mượn sách cần duyệt</h4>
    <BookPendingBorrowList
      v-if="pendingTrackingsCount > 0"
      :trackings="pendingTrackings"
      v-model:activeIndex="activeIndex"
      @refresh-list="refreshList"
    />
    <p v-else>Không có đơn mượn sách cần duyệt.</p>
    <div class="mt-3 row justify-content-around align-items-center">
      <button class="btn btn-sm btn-primary w-auto" @click="refreshList()">
        <i class="fas fa-redo"></i> Làm mới
      </button>
    </div>
  </div>
</template>

<script>
import BookPendingBorrowList from "@/components/BookPendingBorrowList.vue";
import BookBorrowService from "@/services/bookborrow.service";

export default {
  components: { BookPendingBorrowList },
  data() {
    return {
      trackings: [],
      activeIndex: -1,
      staffId: null,
    };
  },
  created() {
    this.staffId = localStorage.getItem("staff_id");
    this.refreshList();
  },
  computed: {
    pendingTrackings() {
      return this.trackings.filter(
        (tracking) => !tracking.staff_id || tracking.staff_id === ""
      );
    },
    pendingTrackingsCount() {
      return this.pendingTrackings.length;
    },
  },
  methods: {
    async retrieveTrackings() {
      try {
        const response = await BookBorrowService.getAllBorrows();
        if (Array.isArray(response)) {
          this.trackings = response;
          console.log("Tổng số đơn mượn:", this.trackings.length);
          console.log("Số đơn cần duyệt:", this.pendingTrackingsCount);
        } else {
          console.error("Dữ liệu không hợp lệ:", response);
          this.trackings = [];
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách mượn sách:", error);
        this.trackings = [];
      }
    },
    refreshList() {
      this.retrieveTrackings();
      this.activeIndex = -1;
    },

    async handleApprove(trackingId) {
      if (!this.staffId) {
        console.error("Không tìm thấy thông tin staff!");
        return;
      }
      try {
        await BookBorrowService.approve(trackingId, this.staffId);
        this.refreshList();
      } catch (error) {
        console.error("Lỗi khi duyệt đơn:", error);
      }
    },
  },
  async created() {
    await this.refreshList();
  },
};
</script>
