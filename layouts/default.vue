<template>
  <v-app>
    <v-navigation-drawer
      app
      clipped
      hide-overlay
      :value="!$vuetify.breakpoint.xs"
      :mini-variant="$vuetify.breakpoint.smOnly || miniVariant"
      stateless
      touchless
      bottom
      :expand-on-hover="$vuetify.breakpoint.smOnly || miniVariant"
    >
      <v-list shaped nav>
        <v-list-item
          v-for="menuItem in mainMenu"
          :key="menuItem.title"
          nuxt
          ripple
          link
          :to="menuItem.link"
          color="primary"
        >
          <v-list-item-action>
            <v-icon>{{ menuItem.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append v-if="isMobile">
        <v-list shaped nav>
          <v-list-item nuxt ripple link to="/chooseprinter">
            <v-list-item-action>
              <v-icon>mdi-undo-variant</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Select cluster</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar background-color="secondary" app clipped-left>
      <v-btn class="hidden-sm-and-down" icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'mdi-chevron-right' : 'mdi-chevron-left'"></v-icon>
      </v-btn>
      <v-avatar size="36px" class="mx-2">
        <img src="/icon.png" alt="Logo" />
      </v-avatar>
      <v-toolbar-title>
        <span class="text-uppercase font-weight-regular">STE App</span>
        <span class="text-uppercase font-weight-medium">{{ currentPage }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="settingsDialog = true" ripple>
            <v-list-item-action>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>

          <v-list-item @click="rebootSystem">
            <v-list-item-action>
              <v-icon>mdi-refresh</v-icon>
            </v-list-item-action>
            <v-list-item-title>Reboot</v-list-item-title>
          </v-list-item>
          <v-list-item @click="poweroffSystem">
            <v-list-item-action>
              <v-icon>mdi-power</v-icon>
            </v-list-item-action>
            <v-list-item-title>Power Off</v-list-item-title>
          </v-list-item>
          <template v-if="isMobile">
            <v-divider inset></v-divider>
            <v-list-item nuxt link to="/chooseprinter">
              <v-list-item-action>
                <v-icon>mdi-undo-variant</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Select cluster</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-app-bar>
    <MainSettingsDialog v-model="settingsDialog" />
    <v-content>
      <v-container fluid grid-list-md class="pb-xs-4">
        <nuxt />
      </v-container>
      <v-snackbar-queue :top="bottomNav" :bottom="!bottomNav" :right="!bottomNav" :timeout="3000">
        <template slot="default" slot-scope="props">
          <v-alert
            :type="props.snackbar && props.snackbar.color"
          >{{props.snackbar && props.snackbar.message}}</v-alert>
        </template>
      </v-snackbar-queue>
      <v-dialog-queue></v-dialog-queue>
    </v-content>
    <v-bottom-navigation app background-color="secondary" grow class="hidden-sm-and-up">
      <v-btn
        text
        v-for="menuItem in mainMenu"
        :key="menuItem.title"
        nuxt
        :to="menuItem.link"
        color="primary"
      >
        <span>{{ menuItem.title }}</span>
        <v-icon>{{ menuItem.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import MainSettingsDialog from '~/components/common/settings/MainSettingsDialog.vue'
import { Action, Getter, State, namespace } from 'vuex-class'

const settings = namespace('settingsState')

@Component({
  components: {
    MainSettingsDialog
  }
})
export default class extends Vue {
  @settings.Action rebootSystem: any
  @settings.Action poweroffSystem: any

  get isMobile (): boolean {
    return process.env.NUXT_ENV_PLATFORM == 'MOBILE'
  }

  private readonly mainMenu: MenuItem[] = [
    {
      icon: 'mdi-view-dashboard',
      title: 'Dashboard',
      link: '/'
    },
    {
      icon: 'mdi-printer-3d',
      title: 'Printers',
      link: '/printers'
    },
    {
      icon: 'mdi-movie-roll',
      title: 'Materials',
      link: '/materials'
    }
  ]
  private miniVariant: boolean = this.$vuetify.breakpoint.smOnly
  private bottomNav: boolean = this.$vuetify.breakpoint.xsOnly



  private settingsDialog: boolean = false

  get currentPage (): string | undefined {
    const name = this.mainMenu.find(obj => {
      return obj.link.includes(this.$route.fullPath.substring(0, 4))
    })
    if (name) {
      return name.title
    }
    return undefined
  }




  mounted () {
    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }
}

class MenuItem {
  icon: string
  title: string
  link: string
  constructor (icon: string, title: string, link: string) {
    this.icon = icon
    this.title = title
    this.link = link
  }
}
</script>

<style>
.v-alert {
  margin-bottom: 0px;
}
</style>
