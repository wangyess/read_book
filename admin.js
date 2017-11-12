;(function () {
    'use strict';
    window.admin = {
        template: '#tpl-admin-page',
        data: function () {
            return {
                product_list_item: {
                    new_book: false,
                    hot_book: false,
                    tex_book: false
                },
                plist: app.product_list,
                nlist: app.new_book_list,
                hlist: app.hot_book_list,
                tlist: app.tex_book_list
            }
        },
        mounted: function () {
            var me = this;
            // Event.$on('receive', function (a, b, h, t) {
            //     me.plist = a;
            //     me.nlist = b;
            //     me.hlist = h;
            //     me.tlist = t;
            // });
            Event.$on('up_success', function () {
                me.product_list_item = {}
            })
        },
        methods: {
            trigger: function (name, data) {
                Event.$emit(name, data);
            },
            filler_page: function (data) {
                this.product_list_item = Object.assign({}, data);
            },

            setbook: function (id) {
                Event.$emit('set_new_book', id);
            },
            set_hot_book: function (id) {
                Event.$emit('set_hotting_book', id);
            },
            set_tex_book: function (id) {
                Event.$emit('set_text_book', id)
            }
        }
    };
})();