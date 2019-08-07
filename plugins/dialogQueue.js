import Vue from 'vue'
import VueObserverUtils from '~/vue-plugins/observerUtils'


export default ({ app }, inject) => {
    Vue.use(VueObserverUtils);

    let lastDialogId = 0;

    // We need an object around the queue.
    // See: https://github.com/vuejs/vue/issues/9500
    const globalDialogState = Vue.observable({ queue: [] });

    const VDialogQueue = {
        name: 'v-dialog-queue',

        props: {
            timeout: {
                type: Number,
                default: 60000,
            },
            pause: {
                type: Number,
                default: 500,
            }
        },

        data() {
            return {
                isShown: false,
                dialog: null,
            };
        },

        created() {
            this.handle = null;
            this.unwait = null;
            this.showNextDialog();
        },

        watch: {
            isShown(newValue, oldValue) {
                if (newValue === false && this.dialog) {
                    const dialogIndex = globalDialogState.queue.findIndex((element) => element.id === this.dialog.id);
                    if (dialogIndex > -1) {
                        globalDialogState.queue.splice(dialogIndex, 1);
                    }
                    this.dialog = null;
                }
            },
        },

        methods: {
            clearDialogState() {

                if (this.handle) {
                    clearTimeout(this.handle);
                    this.handle = null;
                }

                if (this.unwait) {
                    this.unwait();
                    this.unwait = null;
                }
            },

            showNextDialog() {
                this.clearDialogState();

                // Wait for the first next snackbar to be available.
                this.unwait = this.$wait(function () {
                    // Snackbars are enqueued from oldest to newest and "find" searches array elements in
                    // same order as well, so the first one which matches is also the oldest one.
                    return globalDialogState.queue.find((element) => element.shown === false);
                }, function (dialog) {
                    this.unwait = null;

                    dialog.shown = true;

                    this.dialog = dialog;
                    this.isShown = true;

                    this.handle = setTimeout(() => {
                        this.handle = null;

                        this.showNextDialog();
                    }, this.timeout + this.pause);
                });
            },

            onDialogClose() {
                this.clearDialogState();

                this.isShown = false;

                setTimeout(() => {
                    this.showNextDialog();
                }, this.pause);
            },
        },

        render: function (createElement) {
            return createElement(
                Vue.component('VDialog'), {
                    props: {
                        value: this.isShown,
                        persistent: true,
                        maxWidth: 400,
                    },
                    on: {
                        input: (value) => {
                            this.isShown = value;
                        },
                    },
                }, [createElement(Vue.component('VAlert'), {
                    props: {
                        type: this.dialog && this.dialog.color,
                        border: 'top',
                        coloredBorder: true,
                        elevation: 0,
                        value: this.isShown,
                        dismissible: true
                    },
                    on: {
                        input: (value) => {
                            if (value === false) {
                                this.onDialogClose()
                            }
                        },
                    },
                }, [(this.dialog && this.dialog.message)]),
                ],
            );
        },
    };

    Vue.component('VDialogQueue', VDialogQueue);

    inject('dialog', (message, color = 'info') => {
        // message: text of the dialog
        // color: color of the dialog close action ("success", "info", "error")
        // id: id of this dialog
        // enqueuedAt: timestamp when dialog was enqueued
        // shown: true if already shown
        globalDialogState.queue.push({
            message,
            color,
            id: ++lastDialogId,
            enqueuedAt: new Date(),
            shown: false,
        })
    })
}