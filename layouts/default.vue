<template>
  <v-app>
    <v-navigation-drawer
      app
      clipped
      hide-overlay
      :permanent="!$vuetify.breakpoint.xs"
      :mini-variant.sync="$vuetify.breakpoint.sm"
    >
      <v-list>
        <v-list-tile
          v-for="menuItem in mainMenu"
          :key="menuItem.title"
          nuxt
          ripple
          :to="menuItem.link"
        >
          <v-list-tile-action>
            <v-icon>{{ menuItem.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ menuItem.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="white" app clipped-left>
      <v-avatar size="36px">
        <img src="/ste-logo.png" alt="Logo">
      </v-avatar>
      <v-toolbar-title class="text-uppercase font-weight-regular">STE App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn class="hidden-sm-and-up" icon nuxt to="/users">
          <v-avatar size="24px">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
          </v-avatar>
        </v-btn>
        <v-btn class="hidden-xs-only" flat nuxt to="/users">John Doe
          <br>
          <v-avatar size="24px">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
          </v-avatar>
        </v-btn>
        <v-menu bottom left>
          <v-btn slot="activator" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout>
          <nuxt/>
        </v-layout>
      </v-container>
    </v-content>

    <v-bottom-nav app :value="$vuetify.breakpoint.xs" color="secondary">
      <v-btn
        flat
        v-for="menuItem in mainMenu"
        :key="menuItem.title"
        nuxt
        :to="menuItem.link"
        color="primary"
      >
        <span>{{ menuItem.title }}</span>
        <v-icon>{{ menuItem.icon }}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator'

  @Component
  export default class extends Vue {
    private readonly mainMenu: any[] = [
      {
        icon: 'mdi-view-dashboard',
        title: 'Dashboard',
        link: '/'
      },
      {
        icon: 'mdi-printer-3d',
        title: 'Printers',
        link: '/printers'
      }
    ]
  }
</script>