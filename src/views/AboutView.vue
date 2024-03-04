<template>
  <div id="app">
    <h1>Formulario</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="nombre">Nombre de usuario:</label>
        <input type="text" id="nombre" v-model="usuario.nombre" v-validate="'required|min:3'">
        <p class="error" v-if="errors.has('nombre')">{{ errors.first('nombre') }}</p>
      </div>
      <div class="form-group">
        <label for="correo">Correo electrónico:</label>
        <input type="email" id="correo" v-model="usuario.correo" v-validate="'required|email'">
        <p class="error" v-if="errors.has('correo')">{{ errors.first('correo') }}</p>
      </div>
      <div class="form-group">
        <label for="contrasena">Contraseña:</label>
        <input type="password" id="contrasena" v-model="usuario.contrasena" v-validate="'required|min:8'">
        <p class="error" v-if="errors.has('contrasena')">{{ errors.first('contrasena') }}</p>
      </div>
      <div class="form-group">
        <label for="codigo_postal">Código postal:</label>
        <input type="number" id="codigo_postal" v-model="usuario.codigo_postal" v-validate="'required'">
        <p class="error" v-if="errors.has('codigo_postal')">{{ errors.first('codigo_postal') }}</p>
      </div>
      <div class="form-group">
        <label for="fecha_nacimiento">Fecha de nacimiento:</label>
        <input type="date" id="fecha_nacimiento" v-model="usuario.fecha_nacimiento"
          v-validate="'required|date_gte:18y'">
        <p class="error" v-if="errors.has('fecha_nacimiento')">{{ errors.first('fecha_nacimiento') }}</p>
      </div>
      <div class="form-group">
        <label for="imagen">Imagen:</label>
        <input type="file" id="imagen" ref="imagen" @change="onFileChange">
        <p class="error" v-if="errors.has('imagen')">{{ errors.first('imagen') }}</p>
      </div>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VeeValidate from 'vee-validate';

  Vue.use(VeeValidate);

  const app = new Vue({
    el: '#app',
    data: {
      usuario: {
        nombre: '',
        correo: '',
        contrasena: '',
        codigo_postal: '',
        fecha_nacimiento: '',
        imagen: null,
      },
      errors: {}
    },
    methods: {
      onSubmit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            // El formulario es válido
            // Enviar datos al servidor
            console.log('Formulario enviado');
          } else {
            // Mostrar errores
            this.errors = this.$validator.errors;
          }
        });
      },
      onFileChange(e) {
        const file = e.target.files[0];
        if (!file.type.match('image.*')) {
          this.errors.imagen = 'Solo se admiten archivos de imagen';
          return;
        }
        this.usuario.imagen = file;
      }
    }
  });

</script>