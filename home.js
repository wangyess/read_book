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
            this.product_list_all = s.get('product_list');
            this.new_book_l = s.get('new_book_list');
            this.hot_book_l = s.get('hot_book_list');
            this.tex_book_l = s.get('tex_book_list');
            var me = this;
            Event.$on('result_all', function (a) {
                me.search_result = a;
                me.input_item = '';
            });
        },
        methods: {
            search: function (data) {
                Event.$emit('search_a', data);
            },
            add_shop: function (data) {
                Event.$emit('add_shop_l', data);
            },
            detail_info: function (data) {
                console.log('1');
                Event.$emit('find_re', data);
                console.log('3');
            }
        }
    };
})();