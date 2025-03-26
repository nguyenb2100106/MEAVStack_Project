<template>
  <div class="table-responsive">
    <table class="table table-hover shadow-sm rounded">
      <thead class="table-primary text-center">
        <tr>
          <th>STT</th>
          <th>Tiêu đề</th>
          <th>Tác giả</th>
          <th class="text-end">Số lượng</th>
          <th class="text-end">Giá</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(book, index) in books"
          :key="book._id"
          @click="$emit('update:activeIndex', index)"
          :class="{ 'table-active': index === activeIndex }"
          style="cursor: pointer"
        >
          <td class="text-center fw-bold">{{ index + 1 }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td class="text-end">{{ book.quantity }}</td>
          <td class="text-end">{{ formatPrice(book.price) }}</td>
          <td class="text-center">
            <i class="fas fa-chevron-right text-secondary"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    books: { type: Array, required: true },
    activeIndex: { type: Number, required: true },
  },
  emits: ["update:activeIndex"],
  methods: {
    formatPrice(value) {
      if (!value) return "0 VND";
      return new Intl.NumberFormat("vi-VN").format(value) + " VND";
    },
  },
};
</script>

<style scoped>
/* Bo tròn bảng */
.table {
  border-radius: 8px;
  overflow: hidden;
}

/* Tiêu đề bảng có màu */
.table-primary {
  background-color: #007bff !important;
  color: white;
}

/* Hover sáng màu */
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}

/* Căn giữa nội dung trong cột số lượng và giá */
.text-end {
  text-align: right;
}

/* Hiệu ứng mũi tên */
.fa-chevron-right {
  font-size: 1rem;
  transition: transform 0.2s ease-in-out;
}

tr:hover .fa-chevron-right {
  transform: translateX(4px);
  color: #007bff;
}
</style>
