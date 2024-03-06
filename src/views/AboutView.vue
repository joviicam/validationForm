<template>
  <div class="contenedor">
    <form v-on:submit.prevent="validar" class="formulario">
      <div class="titulo">
        <h3>Validación de un formulario en Vue</h3>
      </div>
      <hr />
      <div class="campos">
        <div class="campo">
          <label for="id">Id:</label>
          <input type="number" id="id" v-model="id" />
          <div v-if="enviado && v$.id.$invalid" class="mensajeError">
            Debe escribir un ID válido.
          </div>
        </div>
        <div class="campo">
          <label for="text">Texto:</label>
          <input type="text" id="text" v-model="text" />
          <div v-if="enviado && v$.text.$invalid" class="mensajeError">
            Debe escribir un texto.
          </div>
        </div>
        <div class="campo">
          <label for="card_number">Número de tarjeta:</label>
          <input type="number" id="card_number" v-model="card_number" />
          <div v-if="enviado && v$.card_number.$invalid" class="mensajeError">
            Debe escribir un número de tarjeta válido (16 dígitos).
          </div>
        </div>
        <div class="campo">
          <label for="rfc">RFC:</label>
          <input type="text" id="rfc" v-model="rfc" />
          <div v-if="enviado && v$.rfc.$invalid" class="mensajeError">
            Debe escribir un RFC válido.
          </div>
        </div>
        <div class="campo">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="email" />
          <div v-if="enviado && v$.email.$invalid" class="mensajeError">
            Debe escribir un email válido.
          </div>
        </div>
        <div class="campo">
          <label for="number">Número:</label>
          <input type="number" id="number" v-model="number" />
          <div v-if="enviado && v$.number.$invalid" class="mensajeError">
            Debe escribir un número entre 10 y 30.
          </div>
        </div>
        <div class="campo">
          <label for="date">Fecha de nacimiento:</label>
          <input type="date" id="date" v-model="date" />
          <div v-if="enviado && v$.date.$invalid" class="mensajeError">
            Debe ser mayor de 18 años o ingresar una fecha válida.
          </div>
        </div>
      </div>
      <div class="boton">
        <div>
          <b-button variant="success" type="submit">Guardar</b-button>
        </div>
      </div>
      
    </form>

  </div>
</template>

<style scoped>
  .contenedor {
    display: flex;
    height: 100vh;
    width: 100%;
  }
  .formulario {
    width: 40%;
    padding: 20px;
    align-self: center ;
    align-items: center;
    border: 2px solid black;
    box-shadow: 6px 6px 12px 1px;
    border-radius: 20px;
  }

  .titulo {
    text-align: center;
    margin-bottom: 20px;
  }

  .campos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .campo {
    margin-right: 15px;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 10px;
  }

  button {
    align-self: center;
  }
  .boton {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -25px;
  }

  .mensajeError {
    color: rgb(230, 0, 0);
    margin-top: 5px;
  }
</style>

<script>
  import { useVuelidate } from "@vuelidate/core";
  import { required, minLength, maxLength, email, helpers, minValue, maxValue } from "@vuelidate/validators";
  import formService from '@/service/Form'
  const { withParams } = helpers;
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
        date: "",
      };
    },
    validations() {
      return {
        id: { required, minValue: minValue(1) },
        text: { required },
        card_number: { required, minLength: minLength(16), maxLength: maxLength(16), minValue: minValue(1000000000000000), maxValue: maxValue(9999999999999999) },
        rfc: { required, regex: helpers.regex(/^([A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}[0-1]{1}[0-9]{1}[0-3]{1}[0-9]{1}[A-Z0-9]{3})$/) },
        email: { required, email },
        number: { required, minValue: minValue(10), maxValue: maxValue(30) },
        date: {
          required,
          mustBeAdult: withParams(
            { message: 'Debe ser mayor de 18 años o ingresar una fecha menor a la actual' },
            (value) => {
              const today = new Date();
              const selectedDate = new Date(value);

              if (selectedDate > today) {
                return false;
              }

              const age = today.getFullYear() - selectedDate.getFullYear();
              if (age < 18 || (age === 18 && today < new Date(today.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()))) {
                return false;
              }

              return true;
            }
          ),
        },
      };
    },
    methods: {
      validar() {
        this.enviado = true;
        if (this.v$.$invalid) {
          return;
        }
        alert("Formulario válido.");
        this.postForm()
      },
      async postForm() {
        try {
          console.log('Creando')
          const form = {
            id: this.id,
            text: this.text,
            card_number: this.card_number,
            rfc: this.rfc,
            email: this.email,
            number: this.number,
            date: this.date
          }
          console.log(form)
          const response = await formService.postForm(form)
          console.log(response.data)
          alert('Formulario creado')

        } catch (error) {
          console.error(error)
        }
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