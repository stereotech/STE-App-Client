import Vue from 'vue'

const awaitResultsMap = new WeakMap();

export default function install(Vue, options) {
    if (!Vue.util.Dep) {
        Vue.util.Dep = Vue.observable({}).__ob__.dep.constructor;
    }

    if (!Vue.util.Watcher) {
        Vue.util.Watcher = (function () {
            const vm = {
                _watchers: [],
            };
            Vue.prototype.$watch.call(vm, function () { }, function () { });
            return vm._watchers[0].constructor;
        })();
    }

    if (!Vue.util.nonreactive) {
        Vue.util.nonreactive = function nonreactive(f) {
            const oldTarget = Vue.util.Dep.target;
            Vue.util.Dep.target = null;
            try {
                return f();
            }
            finally {
                Vue.util.Dep.target = oldTarget;
            }
        };
    }

    // Initialize additional fields if they have not ye been initialized.
    function initializeWatcher(watcher) {
        if (Object.prototype.hasOwnProperty.call(watcher, '_invalidated')) {
            return;
        }

        watcher._invalidated = false;
        watcher._onInvalidateCallbacks = [];
        watcher._onTeardownCallbacks = [];
    }

    if (!Vue.util.onInvalidate && !Vue.util.onTeardown) {
        Vue.util.onInvalidate = function onInvalidate(callback) {
            const watcher = Vue.util.Dep.target;

            if (!watcher) {
                throw new Error("Cannot call \"onInvalidate\" outside a reactive context.");
            }
            if (typeof callback !== 'function') {
                throw new Error("\"onInvalidate\" requires a callback function.");
            }

            if (watcher._invalidated) {
                Vue.util.nonreactive(callback);
            }
            else {
                watcher._onInvalidateCallbacks.push(callback);
            }
        };

        Vue.util.onTeardown = function onTeardown(callback) {
            const watcher = Vue.util.Dep.target;

            if (!watcher) {
                throw new Error("Cannot call \"onTeardown\" outside a reactive context.");
            }
            if (typeof callback !== 'function') {
                throw new Error("\"onTeardown\" requires a callback function.");
            }

            if (!watcher.active) {
                Vue.util.nonreactive(callback);
            }
            else {
                watcher._onTeardownCallbacks.push(callback);
            }
        };

        const originalGet = Vue.util.Watcher.prototype.get;
        Vue.util.Watcher.prototype.get = function update() {
            initializeWatcher(this);

            this._invalidated = false;

            return originalGet.call(this);
        };

        const originalUpdate = Vue.util.Watcher.prototype.update;
        Vue.util.Watcher.prototype.update = function update() {
            initializeWatcher(this);

            originalUpdate.call(this);

            if (!this._invalidated) {
                this._invalidated = true;

                while (this._onInvalidateCallbacks.length) {
                    const f = this._onInvalidateCallbacks.shift();
                    Vue.util.nonreactive(f);
                }
            }
        };

        const originalTeardown = Vue.util.Watcher.prototype.teardown;
        Vue.util.Watcher.prototype.teardown = function teardown() {
            initializeWatcher(this);

            originalTeardown.call(this);

            this._invalidated = true;

            while (this._onInvalidateCallbacks.length) {
                const f = this._onInvalidateCallbacks.shift();
                Vue.util.nonreactive(f);
            }

            while (this._onTeardownCallbacks.length) {
                const f = this._onTeardownCallbacks.shift();
                Vue.util.nonreactive(f);
            }
        };
    }

    if (!Vue.prototype.$wait) {
        Vue.prototype.$wait = function $wait(condition, effect, options) {
            const vm = this;

            options = options || {};
            options.user = true;

            let watcher = null;

            function callback(value) {
                // Continue waiting.
                if (!value) {
                    return;
                }

                // If we were called directly by the "watcher" before it has returned.
                // Not sure when this would happen, maybe if "sync" option was set.
                if (!watcher) {
                    // Our watcher is the last watcher pushed.
                    watcher = vm._watchers[vm._watchers.length - 1];
                }

                // Stop waiting.
                watcher.teardown();



                effect.call(vm, value);
            }

            watcher = new Vue.util.Watcher(vm, condition, callback, options);

            try {
                callback.call(vm, watcher.value);
            }
            catch (error) {
                // TODO: Handle the error. See: https://github.com/vuejs/vue/pull/9502
                // handleError(error, vm, `callback for wait watcher "${watcher.expression}"`)
                throw error;
            }

            // If "callback" we just called already stopped waiting, we return "null".
            if (!watcher.active) {
                return null;
            }

            return function unwait() {
                watcher.teardown();
            };
        };
    }

    if (!Vue.prototype.$await) {
        Vue.prototype.$await = function $await(promise, options = {}) {
            options = Object.assign({
                key: promise,
                forgetRejected: false,
                invalidateRejected: false,
            }, options);

            if (!awaitResultsMap.has(options.key)) {
                const dep = new Vue.util.Dep();
                dep.depend();
                promise.then((result) => {
                    awaitResultsMap.set(options.key, result);
                    dep.notify();
                }).catch((error) => {
                    if (options.forgetRejected) {
                        awaitResultsMap.delete(options.key);
                    }
                    if (options.invalidateRejected) {
                        dep.notify();
                    }

                    // TODO: Handle the error. See: https://github.com/vuejs/vue/pull/9502
                    // handleError(error, this, `$awaiting a rejected promise`)
                    console.error(error);
                });
            }
            return awaitResultsMap.get(options.key);
        };
    }
}
