<template>
  <div class="page">
    <h4>Thêm Thông tin Mượn Sách</h4>
    <BorrowForm :borrow="borrow" @submit:borrow="addBorrow" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import BorrowForm from "@/components/BorrowForm.vue";
import BookBorrowService from "@/services/bookborrow.service";
import bookService from "@/services/book.service";

export default {
  components: {
    BorrowForm,
  },
  data() {
    return {
      borrow: {
        book_id: "",
        user_id: "",
        staff_id: "",
        borrow_date: "",
        return_date: "",
      },
      message: "",
    };
  },
  methods: {
    async addBorrow(data) {
      try {
        if (data.staff_id != "") {
          const book = await bookService.getBook(data.book_id);
          if (book.quantity <= 0) {
            this.message = "Không đủ sách để mượn.";
            return;
          }
          const updatedBook = { ...book, quantity: book.quantity - 1 };
          await bookService.updateBook(data.book_id, updatedBook);
        }
        await BookBorrowService.createBorrow(data);
        alert("Thông tin mượn sách đã được thêm thành công.");
        this.$router.push({ name: "bookborrow" });
      } catch (error) {
        console.error(
          "Lỗi khi thêm thông tin mượn sách:",
          error.response || error
        );
        this.message = "Không thể thêm thông tin. Vui lòng thử lại.";
      }
    },
  },
};
</script>
