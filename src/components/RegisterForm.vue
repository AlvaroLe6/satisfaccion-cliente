<script setup>

import { useTheme } from "vuetify"
import AuthProvider from "@/views/authentication/AuthProvider.vue"
import { ref, computed } from "vue"
import { useRouter } from 'vue-router'
import authV1MaskDark from "@/assets/images/pages/auth-v1-mask-dark.png"
import authV1MaskLight from "@/assets/images/pages/auth-v1-mask-light.png"
import authV1Tree2 from "@/assets/images/pages/auth-v1-tree-2.png"
import authV1Tree from "@/assets/images/pages/auth-v1-tree.png"
import { authRegister } from "../stores/authRegister"


const { registerUser } = authRegister();
const router = useRouter()
const vuetifyTheme = useTheme();

const form = ref({
  username: "",
  email: "",
  password: "", 
  privacyPolicies: false,
});


const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === "light"
    ? authV1MaskLight
    : authV1MaskDark;
});

const isPasswordVisible = ref(false);

const handleRegister = () => {
  registerUser(
    form.value.email, 
    form.value.password, 
    form.value.username,
    (user) => {
      console.log('Registro exitoso', user);
      router.push({ name: 'home' });
    },
    (error) => {
      console.error('Error en el registro', error);
    }
  );
};
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
      <VCard
            
          class="auth-card pa-4 pt-7"
           max-width="500"
           elevation="10"
          >
            <VCardItem class="pa-sm-8">
              <div class="d-flex justify-center py-4">
                <img
                  src="@/assets/ESCUELA DE NEGOCIOS_Mesa de trabajo 1.png"
                  alt="80"
                  height="80"
                />
              </div>
            </VCardItem>

            <VCardText class="pt-2">
              <h5 class="text-h6 text-muted font-weight-medium d-flex justify-center align-center mt-3">
                Porque el éxito no es producto de la casualidad
              </h5>
            </VCardText>

            <VCardText>
              <VForm @submit.prevent="handleRegister">
                <VRow>
                  <!-- Usuario -->
                  <VCol cols="12">
                    <v-label class="font-weight-bold mb-1"> Usuario </v-label>
                    <VTextField variant="outlined"
                     v-model="form.username" />
                  </VCol>
                  <!-- email -->
                  <VCol cols="12">
                    <v-label class="font-weight-bold mb-1"> Email </v-label>
                    <VTextField
                      variant="outlined"
                      v-model="form.email"
                      type="email"
                    />
                  </VCol>

                  <!-- password -->
                  <VCol cols="12">
                    <v-label class="font-weight-bold mb-1">
                      Contraseña
                    </v-label>
                    <VTextField
                      variant="outlined"
                      v-model="form.password"
                      placeholder="············"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="
                        isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'
                      "
                      @click:append-inner="
                        isPasswordVisible = !isPasswordVisible
                      "
                    />
                    <div class="d-flex align-center mt-1 mb-4">
                      <VCheckbox
                        id="privacy-policy"
                        v-model="form.privacyPolicies"
                        inline
                      />
                      <VLabel  for="privacy-policy" style="opacity: 1">
                        <span class="me-1">Estoy de acuerdo con las</span>
                        <a href="javascript:void(0)" class="text-primary"
                          >Política de privacidad y términos</a
                        >
                      </VLabel>
                    </div>

                    <VBtn
                      color="primary"
                      size="large"
                      block
                      flat
                      type="submit"
                     
                    >
                      Registrarse
                    </VBtn>
                  </VCol>

                  <!-- Ya tienes una cuenta -->
                  <VCol cols="12" class="text-center text-base">
                    <span>¿Ya tienes una cuenta?</span>
                    <RouterLink class="text-primary ms-2" to="login">
                      iniciar sesión
                    </RouterLink>
                  </VCol>

                  <VCol cols="12" class="d-flex align-center">
                    <VDivider />
                    <span class="mx-4">o</span>
                    <VDivider />
                  </VCol>

                  <!-- Otros provedores de autenticación -->
                  <VCol cols="12" class="text-center">
                    <AuthProvider />
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCard>

          <VImg
            class="auth-footer-start-tree d-none d-md-block"
            :src="authV1Tree"
            :width="250"
          />

          <VImg
            :src="authV1Tree2"
            class="auth-footer-end-tree d-none d-md-block"
            :width="350"
          />

          <!-- bg img -->
          <VImg
            class="auth-footer-mask d-none d-md-block"
            :src="authThemeMask"
          />
    
  </div>
</template>

<style lang="scss">
@use "@/@core/scss/pages/page-auth.scss";
</style>
<style>
.text-body-1 {
  font-size: 1.5rem;
  font-weight: bold;
}

</style>
