;(function () {
    'use strict';
    window.home = {
        template: '#tpl-home-page',
        data: function () {
            return {
                input_item: '',
                search_result: [],
                product_list_all: app.product_list,
                new_book_l: app.new_book_list,
                hot_book_l: app.hot_book_list,
                tex_book_l: app.tex_book_list
            }
        },
        mounted: function () {
            var me = this;
            Event.$on('result_all', function (a) {
                me.search_result = a;
                me.input_item = '';
            });
            // Event.$on('receive', function (a, b, h, t) {
            //     me.product_list_all = a;
            //     me.new_book_l = b;
            //     me.hot_book_l = h;
            //     me.tex_book_l = t;
            // })
        },
        methods: {
            search: function (data) {
                Event.$emit('search_a', data);
            },
            add_shop: function (data) {
                Event.$emit('add_shop_l', data);
            }
        }
    };
})();