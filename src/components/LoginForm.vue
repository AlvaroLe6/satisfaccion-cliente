<script setup>
import { ref } from 'vue';
import { useForm, useField } from "vee-validate";
import { loginSchema as validationSchema } from "../validation/loginSchema";
import { useAuthStore } from "../stores/auth";

const checkbox = ref(true);

const { handleSubmit } = useForm({ validationSchema });
const auth = useAuthStore();

const email = useField("email");
const password = useField("password");
 
const submit = handleSubmit((values) => {
  auth.login(values);
});
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-alert
      v-if="auth.hasError"
      class="my-5"
      type="error"
      :title="auth.errorMsg"
    >{{ auth.errorMsg }}</v-alert>

        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">
            Email
             </v-label>
            <v-text-field 
            variant="outlined" 
            color="primary"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            >
            </v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label 
            class="font-weight-bold mb-1"
            >
            Contraseña
             </v-label>
            <v-text-field 
            variant="outlined" 
            type="password"  
            color="primary"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            >
            </v-text-field>
        </v-col>
        <v-col cols="12" class="pt-0">
            <div class="d-flex flex-wrap align-center ml-n2">
                <v-checkbox v-model="checkbox"  color="primary" hide-details>
                    <template v-slot:label>Recuerda este dispositivo</template>
                </v-checkbox>
                <div class="ml-sm-auto">
                    <RouterLink to="/"
                        class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">¿Has olvidado tu contraseña?</RouterLink>
                </div>
            </div>
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-btn 
            color="primary" 
            size="large" 
            block   
            flat
            @click="submit"
            >
            Iniciar sesión
            </v-btn>
        </v-col>
    </v-row>
</template>
