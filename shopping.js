;(function () {
    'use strict';
    window.shopping = {
        template: '#tpl-shop-page',
        data: function () {
            return {
                product_shop:app.shop_list
            }
        },
        mounted: function () {

        },
        methods: {
           del_shop:function (id) {
               Event.$emit('del_shop_l',id);
           }
        }
    }
})();