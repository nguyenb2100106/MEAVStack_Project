<template>
  <div class="container mt-3">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên Sách</th>
          <th>Người Mượn</th>
          <th>Ngày Mượn</th>
          <th>Ngày Trả</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(tracking, index) in trackings"
          :key="tracking._id"
          :class="{ active: index === activeIndex }"
          @click="$emit('update:activeIndex', index)"
        >
          <td>{{ index + 1 }}</td>
          <td v-if="books[index]">{{ books[index].title }}</td>
          <td v-if="users[index]">{{ users[index].name }}</td>
          <td>{{ tracking.borrow_date }}</td>
          <td>{{ tracking.return_date }}</td>
          <td>
            <button
              class="btn btn-sm btn-success me-2"
              @click="approveTracking(tracking._id)"
            >
              Duyệt đơn
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import bookService from "@/services/book.service";
import bookBorrowService from "@/services/bookborrow.service";

export default {
  props: {
    trackings: { type: Array, required: true },
    activeIndex: { type: Number, required: true },
  },
  emits: ["update:activeIndex", "refresh-list"],
  data() {
    return {
      users: [],
      books: [],
    };
  },
  watch: {
    trackings: {
      handler() {
        this.fetchAllData();
      },
      immediate: true,
      deep: true,
    },
  },
  // methods: {
  //   async fetchAllData() {
  //     this.users = [];
  //     this.books = [];
  //     try {
  //       for (const tracking of this.trackings) {
  //         await Promise.all([
  //           this.fetchUser(tracking.user_id),
  //           this.fetchBook(tracking.book_id),
  //         ]);
  //       }
  //     } catch (error) {
  //       console.error("Lỗi khi lấy dữ liệu:", error);
  //     }
  //   },

  //   async fetchUser(userId) {
  //     try {
  //       const response = await userService.getUser(userId);
  //       this.users.push(response);
  //     } catch (error) {
  //       console.error("Lỗi khi lấy người mượn:", error);
  //     }
  //   },

  //   async fetchBook(bookId) {
  //     try {
  //       const response = await bookService.getBook(bookId);
  //       this.books.push(response);
  //     } catch (error) {
  //       console.error("Lỗi khi lấy sách:", error);
  //     }
  //   },

  //   async approveTracking(trackingId) {
  //     try {
  //       const staffId = localStorage.getItem("_id");
  //       if (!staffId) {
  //         alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!");
  //         return;
  //       }

  //       const tracking = await bookBorrowService.getBorrowById(trackingId);
  //       const book = await bookService.getBook(tracking.book_id);

  //       if (book.quantity <= 0) {
  //         alert("Không đủ sách để mượn!");
  //         return;
  //       }

  //       // Cập nhật số lượng sách
  //       const updatedBook = { ...book, quantity: book.quantity - 1 };
  //       await bookService.updateBook(tracking.book_id, updatedBook);

  //       // Cập nhật thông tin mượn sách
  //       const updatedTracking = { staff_id: staffId };
  //       const response = await bookBorrowService.updateBorrow(
  //         trackingId,
  //         updatedTracking
  //       );

  //       if (response) {
  //         alert("Đã duyệt thành công đơn mượn sách!");
  //         this.$emit("refresh-list");
  //       }
  //     } catch (error) {
  //       console.error("Lỗi khi duyệt:", error);
  //       alert("Có lỗi xảy ra khi duyệt đơn mượn sách!");
  //     }
  //   },
  // },
  methods: {
    async fetchAllData() {
      this.users = [];
      this.books = [];
      try {
        const promises = this.trackings.map(async (tracking) => {
          const [user, book] = await Promise.all([
            userService.getUser(tracking.user_id),
            bookService.getBook(tracking.book_id),
          ]);
          return { user, book };
        });

        const results = await Promise.all(promises);
        results.forEach(({ user, book }) => {
          this.users.push(user);
          this.books.push(book);
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },

    async approveTracking(trackingId) {
      try {
        const staffId = localStorage.getItem("_id");
        if (!staffId) {
          alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!");
          return;
        }

        // Lấy thông tin mượn sách
        const tracking = await bookBorrowService.getBorrowById(trackingId);

        // Kiểm tra và cập nhật số lượng sách
        const book = await bookService.getBook(tracking.book_id);
        if (!book) {
          alert("Không tìm thấy thông tin sách!");
          return;
        }

        if (book.quantity <= 0) {
          alert("Không đủ sách để mượn!");
          return;
        }

        // Cập nhật thông tin mượn sách trước
        const updatedTracking = { ...tracking, staff_id: staffId };
        await bookBorrowService.updateBorrow(trackingId, updatedTracking);

        // Sau đó mới cập nhật số lượng sách
        const updatedBook = { ...book, quantity: book.quantity - 1 };
        await bookService.updateBook(book._id, updatedBook);

        alert("Đã duyệt thành công đơn mượn sách!");
        this.$emit("refresh-list");
      } catch (error) {
        console.error("Lỗi khi duyệt:", error);
        alert("Có lỗi xảy ra khi duyệt đơn mượn sách!");
      }
    },
  },
};
</script>
