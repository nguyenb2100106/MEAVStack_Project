<template>
  <div class="staff-list-container">
    <ul class="list-group shadow-sm rounded">
      <li
        v-for="(staff, index) in staffs"
        :key="staff._id"
        class="list-group-item d-flex justify-content-between align-items-center"
        :class="{ 'active-item': index === activeIndex }"
        @click="$emit('update:activeIndex', index)"
      >
        <span class="staff-name">{{ staff.name }}</span>
        <i class="fas fa-chevron-right text-secondary"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    staffs: { type: Array, required: true },
    activeIndex: { type: Number, required: true },
  },
  emits: ["update:activeIndex"],
};
</script>

<style scoped>
/* Bo góc và đổ bóng */
.staff-list-container {
  max-width: 400px;
  margin: auto;
}

.list-group {
  border-radius: 8px;
  overflow: hidden;
}

/* Mục danh sách */
.list-group-item {
  transition: background-color 0.2s ease-in-out, transform 0.1s;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 12px 16px;
}

/* Hover */
.list-group-item:hover {
  background-color: #f8f9fa;
  transform: scale(1.02);
}

/* Hàng được chọn */
.active-item {
  background-color: #007bff !important;
  color: white;
}

/* Mũi tên di chuyển nhẹ khi hover */
.fa-chevron-right {
  transition: transform 0.2s ease-in-out;
}

.list-group-item:hover .fa-chevron-right {
  transform: translateX(4px);
  color: #007bff;
}

/* Tên nhân viên căn trái */
.staff-name {
  font-weight: 500;
}
</style>
