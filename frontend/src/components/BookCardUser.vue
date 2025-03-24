<template>
  <div
    class="book-card d-flex flex-column p-3 border shadow-sm rounded"
    v-bind="$attrs"
  >
    <div class="book-title">
      <h5 class="book-title">{{ book.title }}</h5>
    </div>

    <div class="d-flex flex-row justify-content-between align-items-start">
      <div class="book-image">
        <img
          :src="'http://localhost:3000' + book.image"
          alt="Book Image"
          class="img-fluid rounded shadow"
        />
      </div>
      <div class="book-info flex-grow-1 ms-3">
        <p class="book-author">Tác giả: {{ book.author }}</p>
        <p class="book-price">Giá: {{ book.price }} VND</p>
        <p class="book-year">Năm xuất bản: {{ book.publisher_year }}</p>
        <div class="d-flex justify-content-end">
          <button class="borrow-btn" @click="showBorrowForm">Mượn</button>
        </div>
      </div>
    </div>
  </div>

  <!-- <div v-if="isFormVisible" class="borrow-form-overlay">
    <div class="borrow-form-container">
      <h4>Thêm Thông tin Mượn Sách</h4>
      <form @submit.prevent="submitBorrowingForm">
        <div class="form-group">
          <label for="return_date">Ngày trả:</label>
          <input
            type="date"
            id="return_date"
            v-model="borrowing.return_date"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-success w-100">
          Tạo đơn mượn sách
        </button>
        <button
          type="button"
          class="btn btn-danger w-100"
          @click="hideBorrowForm"
        >
          Hủy
        </button>
      </form>
    </div>
  </div> -->

  <div v-if="isFormVisible" class="borrow-form-overlay">
    <div class="borrow-form-container">
      <h4>Thêm Thông tin Mượn Sách</h4>
      <form @submit.prevent="submitBorrowingForm">
        <div class="form-group">
          <label>Tên sách:</label>
          <p>{{ book.title }}</p>
        </div>

        <div class="form-group">
          <label>Người mượn:</label>
          <p>{{ user_name }}</p>
        </div>

        <div class="form-group">
          <label>Số lượng:</label>
          <p>1 cuốn</p>
        </div>

        <div class="form-group">
          <label>Giá tiền:</label>
          <p>{{ book.price }} VND</p>
        </div>

        <div class="form-group">
          <label>Ngày mượn:</label>
          <p>{{ borrowing.borrow_date }}</p>
        </div>

        <div class="form-group">
          <label for="return_date">Ngày trả:</label>
          <input
            type="date"
            id="return_date"
            v-model="borrowing.return_date"
            class="form-control"
            required
          />
        </div>

        <button type="submit" class="btn btn-success w-100">
          Tạo đơn mượn sách
        </button>
        <button
          type="button"
          class="btn btn-danger w-100"
          @click="hideBorrowForm"
        >
          Hủy
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import bookborrowService from "@/services/bookborrow.service";

export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFormVisible: false,
      user_name: localStorage.getItem("name"),
      borrowing: {
        book_id: this.book._id,
        user_id: localStorage.getItem("_id"),
        staff_id: "",
        borrow_date: new Date().toISOString().split("T")[0],
        return_date: "",
      },
    };
  },
  methods: {
    showBorrowForm() {
      this.isFormVisible = true;
    },
    hideBorrowForm() {
      this.isFormVisible = false;
    },
    async submitBorrowingForm() {
      try {
        const [startYear, startMonth, startDay] =
          this.borrowing.borrow_date.split("-");
        this.borrowing.borrow_date = `${startDay}/${startMonth}/${startYear}`;
        const [returnYear, returnMonth, returnDay] =
          this.borrowing.return_date.split("-");
        this.borrowing.return_date = `${returnDay}/${returnMonth}/${returnYear}`;

        await this.addBorrowing(this.borrowing);
        alert(
          "Đơn mượn sách đã được tạo thành công! Vui lòng chờ nhân viên duyệt."
        );
        this.hideBorrowForm();
      } catch (error) {
        console.error("Lỗi khi tạo đơn mượn sách:", error);
        alert("Có lỗi xảy ra khi tạo đơn mượn sách!");
      }
    },
    async addBorrowing(borrowing) {
      try {
        await bookborrowService.createBorrow(borrowing);
        this.$router.push({ name: "bookuser" });
      } catch (error) {
        console.error(
          "Lỗi khi thêm thông tin mượn sách:",
          error.response || error
        );
      }
    },
  },
};
</script>

<style scoped>
/* Bố cục chung của thẻ sách */
.book-card {
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #e3f2fd; /* Màu xanh nhạt */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; /* Khoảng cách giữa các book card */
  transition: transform 0.2s ease-in-out;
}

.book-card:hover {
  transform: scale(1.02); /* Hiệu ứng phóng to nhẹ khi hover */
}

/* Tiêu đề sách */
.book-title h5 {
  font-size: 1.4rem;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
}

/* Hình ảnh sách */
.book-image {
  flex-shrink: 0;
  width: 120px;
  height: 180px;
}

.book-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Phần thông tin sách */
.book-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
  font-size: 1rem;
}

.book-author,
.book-price,
.book-year {
  margin-bottom: 5px;
  font-size: 1rem;
  color: #333;
}

/* Nút mượn sách */
.borrow-btn {
  margin-top: auto;
  padding: 10px 18px;
  background-color: #1e88e5; /* Màu xanh */
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;
}

.borrow-btn:hover {
  background-color: #1565c0;
  transform: scale(1.05);
}

/* Form mượn sách */
.borrow-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.borrow-form-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.borrow-form-container label {
  font-weight: bold;
}

.borrow-form-container input {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.borrow-form-container button {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.borrow-form-container .btn-success {
  background-color: #4caf50;
  color: white;
}

.borrow-form-container .btn-success:hover {
  background-color: #388e3c;
}

.borrow-form-container .btn-danger {
  background-color: #f44336;
  color: white;
}

.borrow-form-container .btn-danger:hover {
  background-color: #d32f2f;
}
</style>
