<script setup>
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();

console.log("user name",auth.username)
</script>

<template>


<div v-if="auth.isAuth">
    Bienvenido, {{ auth.isAuth.username || 'Usuario' }} <!-- Muestra el nombre de usuario -->
    <img :src="auth.isAuth.photoURL" alt="Avatar del usuario"> <!-- Muestra la foto de perfil -->
    <!-- Otros detalles del usuario -->
  </div>
  
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
    <VAvatar class="cursor-pointer" 
    color="primary" 
    variant="tonal">
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu activator="parent" 
      width="230" 
      location="bottom end" 
      offset="14px">
        <VList>
          <!--  User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar 
                  color="primary" 
                  variant="tonal">
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              Admin
            </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem :to="{ name: 'account-settings' }" >
            <template 
            #prepend>
              <VIcon class="me-2" 
              icon="ri-user-line" 
              size="22" 
              
              />
            </template>

            <VListItemTitle
            :to="{ name: 'account-settings' }" 
            >Perfil</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template 
            #prepend>
              <VIcon 
              class="me-2" 
              icon="ri-settings-4-line" 
              size="22" />
            </template>

            <VListItemTitle>
              Ajustes
            </VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem to="/login">
            <template 
            #prepend>
              <VIcon 
              class="me-2" 
              icon="ri-logout-box-r-line" 
              size="22" />
            </template>

            <VListItemTitle @click="auth.logout"> Cerrar sesión</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>

