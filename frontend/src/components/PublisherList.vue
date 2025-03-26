<script>
export default {
  props: {
    publishers: { type: Array, required: true },
    activeIndex: { type: Number, required: true },
  },
  emits: ["update:activeIndex"],
  methods: {
    editPublisher(publisher) {
      this.$emit("edit", publisher);
    },
  },
};
</script>

<template>
  <div>
    <div v-if="publishers.length === 0" class="text-center p-3">
      Không có dữ liệu nhà xuất bản.
    </div>
    <table v-else class="table table-hover">
      <thead class="thead-light">
        <tr>
          <th>STT</th>
          <th>Nhà xuất bản</th>
          <th>Địa chỉ</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(publisher, index) in publishers"
          :key="publisher._id"
          :class="{ active: index === activeIndex }"
          @click="$emit('update:activeIndex', index)"
          style="cursor: pointer"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ publisher.name }}</td>
          <td>{{ publisher.address }}</td>
          <td>
            <router-link
              :to="{
                name: 'publisher.edit',
                params: { id: publisher._id },
              }"
              class="btn btn-sm btn-warning me-2"
            >
              Hiệu chỉnh
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Căn giữa tiêu đề */
h4 {
  font-weight: bold;
  text-align: center;
  color: #0d6efd; /* Màu xanh dương */
  margin-bottom: 20px;
}

/* Làm đẹp bảng */
.table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Làm đẹp tiêu đề bảng */
.thead-light th {
  background-color: #d1e7ff; /* Màu xanh nhạt */
  color: black;
  font-weight: bold;
  padding: 12px;
  text-align: center;
  white-space: nowrap;
}

/* Viền tròn góc trên cùng */
.thead-light th:first-child {
  border-top-left-radius: 10px;
}

.thead-light th:last-child {
  border-top-right-radius: 10px;
}

/* Làm đẹp hàng dữ liệu */
.table tbody tr {
  border-bottom: 1px solid #ddd;
  transition: background-color 0.2s ease-in-out;
}

.table tbody tr:hover {
  background-color: #f1faff;
}

/* Làm nổi bật hàng được chọn */
.table tbody tr.active {
  background-color: #cfe2ff !important; /* Xanh nhạt */
  font-weight: bold;
}

/* Căn giữa nội dung trong ô */
.table td {
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}

/* Nút chỉnh sửa */
.btn-warning {
  background-color: #ffc107;
  color: black;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 6px;
  transition: background 0.2s ease-in-out;
}

.btn-warning:hover {
  background-color: #e0a800;
}

/* Căn giữa thông báo không có dữ liệu */
.text-center.p-3 {
  background-color: #f8f9fa;
  border-radius: 8px;
  font-style: italic;
  color: #6c757d;
}
</style>
