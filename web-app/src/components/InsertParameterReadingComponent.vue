<script setup>
  import EntitySelector from './EntitySelector.vue';
  import fetchTanks from '../lib/fetchTanks';
  import fetchParameters from '../lib/fetchParameters';
  import postParameterReading from '../lib/postParameterReading';

  import { ref } from 'vue';

  const parameterReading = ref({
    tankId: null,
    parameterId: null,
    value: null
  });

  const tank = ref(null);
  const parameter = ref(null);
  const value = ref(null);

  const sendRequest = async function() {
    const parameterReading = {
      tankId: tank.value.id,
      parameterId: parameter.value.id,
      value: value.value,
      time: new Date(),
      showInDashboard: true
    };
    console.log(`Storing new ParameterReading: ${JSON.stringify(parameterReading)}`);
    await postParameterReading(parameterReading);
  };
</script>

<template>
  <div class="inline">
    <div class="insert-parameter-reading">
      <h2>Create ParameterReading</h2>
      <div>
        <EntitySelector entityName="Tank" :fetchFn="fetchTanks" entityNameField="name" v-model="tank"/>
        <EntitySelector entityName="Parameter" :fetchFn="fetchParameters" entityNameField="name" v-model="parameter"/>
        <div class="field-entry">
          <label>Value: </label>
          <input type="number" v-model="value"/>
        </div>
        <button class="sumbit" @click="sendRequest">Create</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inline {
  display: inline-block;
}

.insert-parameter-reading {
  display: grid;
  grid-template-rows: auto 1fr;
}

.insert-parameter-reading > div {
  display: grid;
  grid-template-rows: repeat(1fr, 4);
}

.field-entry {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.field-entry > input {
  padding: 5px;
}
</style>
