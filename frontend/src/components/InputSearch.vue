<template>
  <div class="search-box">
    <input
      type="text"
      class="form-control"
      placeholder="Nhập tên sách hoặc tác giả..."
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
};
</script>

<style scoped>
.search-box {
  width: 100%;
  max-width: 5000px;
  margin: 0 auto 20px;
  display: flex;
  justify-content: center;
}

.search-box input {
  width: 100%;
}

.form-control {
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
}
</style>
