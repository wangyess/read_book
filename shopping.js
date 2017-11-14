;(function () {
    'use strict';
    window.shopping = {
        template: '#tpl-shop-page',
        data: function () {
            return {
                product_shop: []
            }
        },
        mounted: function () {
            this.product_shop = s.get('shop_list');
            var me = this;
            Event.$on('del_success', function () {
                console.log(me.product_shop);
                me.product_shop = s.get('shop_list');
            });
        },
        methods: {
            del_shop: function (id) {
                Event.$emit('del_shop_l', id);
            },
            detail_show: function (id) {
                Event.$emit('find_re', id);
            }
        }
    }
})();