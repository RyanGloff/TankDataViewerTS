<script setup>
  import { ref, defineEmits, defineProps, onMounted, watch } from 'vue';

  const props = defineProps({
    modelValue: Object,
    entityName: String,
    entityNameField: String,
    fetchFn: Function
  });

  const emit = defineEmits([
    'update:modelValue'
  ]);

  const options = ref([]);
  const selectedId = ref(props.modelValue?.id || '');

  onMounted(async () => {
    try { 
      options.value = await props.fetchFn();
    } catch (error) {
      console.error(`Error fetching ${props.entityName}:`, error);
    }
  });

  watch(() => props.modelValue, (newValue) => {
    selectedId.value = newValue?.id || '';
  }, { immediate: true });

  const onSelectionChange = (event) => {
    const selected = options.value.find(option => option.id == selectedId.value);
    emit('update:modelValue', selected);
  };

</script>

<template>
  <div class="object-selector">
    <label :for="entityName">{{ `Select ${entityName}:` }}</label>
    <select :id="entityName" v-model="selectedId" @change="onSelectionChange">
      <option disabled value="">Select One</option>
      <option v-for="option in options" :key="option.id" :value="option.id">
      {{ option[entityNameField] }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.object-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

select {
  padding: 5px;
  font-size: 16px;
}
</style>
