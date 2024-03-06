<template>
  <div>
    <form v-on:submit.prevent="validar">
      <div id="titulo">
        <h1>Validación de un formulario en Vue</h1>
      </div>
      <hr />
      <div id="campos">
        <div>
          <label>Id: </label>
          <input type="number" id="id" v-model="id" />
          <div v-if="enviado && v$.id.$invalid" class="mensajeError">
            Debe escribir un id válido.
          </div>
        </div>
        <div>
          <label>Texto: </label>
          <input type="text" id="text" v-model="text" />
          <div v-if="enviado && v$.text.$invalid" class="mensajeError">
            Debe escribir un texto.
          </div>
        </div>
        <div>
          <label>Numero de tarjeta: </label>
          <input type="number" id="card_number" v-model="card_number" />
          <div v-if="enviado && v$.card_number.$invalid" class="mensajeError">
            Debe escribir un numero de tarjeta válido (16 dígitos).
          </div>
        </div>
        <div>
          <label>RFC: </label>
          <input type="text" id="rfc" v-model="rfc" />
          <div v-if="enviado && v$.rfc.$invalid" class="mensajeError">
            Debe escribir un rfc válido.
          </div>
        </div>
        <div>
          <label>Email: </label>
          <input type="text" id="email" v-model="email" />
          <div v-if="enviado && v$.email.$invalid" class="mensajeError">
            Debe escribir un email válido.
          </div>
        </div>
        <div>
          <label>Número: </label>
          <input type="number" id="number" v-model="number" />
          <div v-if="enviado && v$.number.$invalid" class="mensajeError">
            Debe escribir un número entre 10 y 30.
          </div>
        </div>
        <button type="submit">Validar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength , email, helpers, minValue, maxValue } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      enviado: false,
      id: "",
      text: "",	
      card_number: "",
      rfc: "",
      email: "",
      number: "",
    };
  },
  validations() {
    return {
      id: { required, minValue: minValue(1)},
      text: { required },
      card_number: { required, minLength: minLength(16), maxLength: maxLength(16), minValue: minValue(1000000000000000), maxValue: maxValue(9999999999999999)},
      rfc: { required, regex: helpers.regex(/^([A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}[0-1]{1}[0-9]{1}[0-3]{1}[0-9]{1}[A-Z0-9]{3})$/) },
      email: { required, email },
      number: { required, minValue: minValue(10), maxValue: maxValue(30)},
    };
  },
  methods: {
    validar() {
      this.enviado = true;
      if (this.v$.$invalid) {
        return;
      }
      console.log("Formulario válido.");
    },
  },
};
</script>

<style scoped>
form {
  width: fit-content;
  padding-top: 20px;
  border: 2px solid black;
  box-shadow: 6px 6px 12px 1px;
  border-radius: 20px;
  margin: 0 auto;
}

#titulo {
  padding: 0px 30px 0px 30px;
}

#campos {
  padding: 50px;
  text-align: left;
  margin-left: 70px;
}

button {
  margin-left: 35%;
  margin-top: 20px;
}

input {
  margin: 10px;
}

.mensajeError {
  color: rgb(230, 0, 0);
}
</style>
