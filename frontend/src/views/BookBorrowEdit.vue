<template>
  <div v-if="borrow" class="page">
    <h4>Chỉnh sửa thông tin Mượn Sách</h4>
    <BorrowForm
      :borrow="borrow"
      @submit:borrow="updateBorrow"
      @delete:borrow="deleteBorrow"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import BorrowForm from "@/components/BorrowForm.vue";
import BookBorrowService from "@/services/bookborrow.service";

export default {
  components: {
    BorrowForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      borrow: null,
      message: "",
    };
  },
  methods: {
    async getBorrow() {
      const id = this.$route.params.id;
      if (!id) {
        console.error("Không tìm thấy ID!");
        return;
      }
      try {
        this.borrow = await BookBorrowService.getBorrowById(id);
      } catch (error) {
        console.error("Không tìm thấy bản ghi mượn sách:", error);
        this.$router.push({
          name: "notfound",
          params: { pathMatch: this.$route.path.split("/").slice(1) },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateBorrow(data) {
      try {
        await BookBorrowService.updateBorrow(this.borrow._id, data);
        alert("Thông tin mượn sách đã được cập nhật thành công.");
        this.$router.push({ name: "bookborrow" });
      } catch (error) {
        console.error("Lỗi khi cập nhật thông tin mượn sách:", error);
        this.message = "Không thể cập nhật thông tin. Vui lòng thử lại.";
      }
    },
    async deleteBorrow() {
      if (confirm("Bạn có chắc chắn muốn xóa bản ghi này?")) {
        try {
          await BookBorrowService.deleteBorrow(this.borrow._id);
          alert("Thông tin mượn sách đã được xóa thành công.");
          this.$router.push({ name: "bookborrow" });
        } catch (error) {
          console.error("Lỗi khi xóa thông tin mượn sách:", error);
          this.message = "Không thể xóa bản ghi. Vui lòng thử lại.";
        }
      }
    },
  },
  created() {
    this.getBorrow(this.id);
    this.message = "";
  },
};
</script>
