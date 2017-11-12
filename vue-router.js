;(function () {
    'use strict';
    window.Event = new Vue();
    var sign_in = {
        template: '#tpl-sign-page'
    };
    var login = {
        template: '#tpl-login-page'
    };
    //..............................................路由
    var routes = [
        {
            path: '/',
            component: home,
        },
        {
            path: '/shopping',
            component: shopping,
        },
        {
            path: '/sign_in',
            component: sign_in,
        },
        {
            path: '/login',
            component: login,
        },
        {
            path: '/admin',
            component: admin,
        },
    ];
    var router = new VueRouter({
        routes: routes
    });
    //...................................................实例
    window.app = new Vue({
        el: '#app',
        router: router,
        data: {
            product_list: [],
            product_last_id: 0,
            //新书
            new_book_list: [],
            //热书
            hot_book_list: [],
            //电子书
            tex_book_list: [],
            //购物车
            shop_list:[]
        },
        mounted: function () {
            //新书
            this.new_book_list = s.get('new_book_list') || [];
            //热书
            this.hot_book_list = s.get('hot_book_list') || [];
            //电子书
            this.tex_book_list = s.get('tex_book_list') || [];
            //购物车
            this.shop_list=s.get('shop_list') || [];
            //全部商品
            this.product_list = s.get('product_list') || [];
            this.product_last_id = s.get('product_last_id') || 0;
            // this.protal();
            var me = this;
            Event.$on('add_up', function (data) {
                me.add_or_updata(data);
            });
            Event.$on('to_del', function (data) {
                me.del(data);
            });
            Event.$on('search_a', function (data) {
                me.search_all(data);
            });

            //新书
            Event.$on('set_new_book', function (id) {
                me.set_new_book_list(id);
            });
            //热书
            Event.$on('set_hotting_book', function (id) {
                me.set_hot_book_list(id);
            });
            //电子书
            Event.$on('set_text_book', function (id) {
                me.set_tex_book_list(id);
            });
            //购物车
            Event.$on('add_shop_l',function (id) {
                me.add_shop_list(id);
            });
        },
        methods: {
            //...................................让后台获取到product_list
            // protal: function () {
            //     Event.$emit('receive', this.product_list, this.new_book_list, this.hot_book_list, this.tex_book_list);
            // },
            //..................................使首页搜索出来的对象集合  传给home.js的数组以便 显示在页面上
            search_all: function (data) {
                var a = this.search_al(data);
                Event.$emit('result_all', a);
            },

            //..........................................增删改查查找索引
            search_al: function (data) {
                return this.product_list.filter(function (item) {
                    if (item.title.indexOf(data) !== -1) {
                        return true;
                    }
                })
            },
            add_or_updata: function (data) {
                if (!data.title || !data.price || !data) {
                    throw '请正确输入信息!';
                }
                if (data.id) {
                    var up_index = this.find_index(data.id);
                    if (up_index === -1) {
                        throw '找不到指定的索引';
                    }
                    Vue.set(this.product_list, up_index, Object.assign({}, this.product_list[up_index], data))
                }
                else {
                    data.id = s.get('product_last_id') + 1;
                    this.product_list.push(Object.assign({}, data));
                    this.up_product_last_id();
                }
                Event.$emit('up_success');
            },
            del: function (data) {
                var del_index = this.find_index(data);
                if (del_index === -1) {
                    throw '没找到删除不了啊!咋办,老大?'
                }
                this.product_list.splice(del_index, 1);
            },
            find_index: function (id) {
                return this.product_list.findIndex(function (item) {
                    if (item.id === id) {
                        return true;
                    }
                })
            },
            up_product_list: function () {
                s.set('product_list', this.product_list);
            },
            up_product_last_id: function () {
                var last_id = s.get('product_last_id');
                s.set('product_last_id', last_id + 1);
            },

            //...........................................新书
            set_new_book_list: function (id) {
                //................找到总数组中 指定ID 的 索引
                var item_index = this.find_index(id);
                //  判断如果能找到   就执行下面的代码
                if (item_index !== -1) {
                    //判断  如果new_book 为false  我就把他加到  新书中
                    if (this.product_list[item_index].new_book === false) {
                        this.new_book_list.push(Object.assign({}, this.product_list[item_index]));
                    } else {
                        var c = this.search_new_book_index(id);
                        this.new_book_list.splice(c, 1);
                    }
                }
            },
            search_new_book_index: function (id) {
                return this.new_book_list.findIndex(function (item) {
                    if (item.id === id) {
                        return true;
                    }
                })
            },
            up_new_book_list: function () {
                s.set('new_book_list', this.new_book_list);
            },
            //...........................................热书
            set_hot_book_list: function (id) {
                var item_index = this.find_index(id);
                if (item_index !== -1) {
                    if (this.product_list[item_index].hot_book === false) {
                        this.hot_book_list.push(Object.assign({}, this.product_list[item_index]));
                    } else {
                        var c = this.search_hot_book_index(id);
                        this.hot_book_list.splice(c, 1);
                    }
                }
            },
            search_hot_book_index: function (id) {
                return this.hot_book_list.findIndex(function (item) {
                    if (item.id === id) {
                        return true;
                    }
                })
            },
            up_hot_book_list: function () {
                s.set('hot_book_list', this.hot_book_list);
            },
            //...........................................电子书
            set_tex_book_list: function (id) {
                var item_index = this.find_index(id);
                if (item_index !== -1) {
                    if (this.product_list[item_index].tex_book === false) {
                        this.tex_book_list.push(Object.assign({}, this.product_list[item_index]));
                    } else {
                        var c = this.search_tex_book_index(id);
                        this.tex_book_list.splice(c, 1);
                    }
                }
            },
            search_tex_book_index: function (id) {
                return this.tex_book_list.findIndex(function (item) {
                    if (item.id === id) {
                        return true;
                    }
                })
            },
            up_tex_book_list: function () {
                s.set('tex_book_list', this.tex_book_list);
            },

            //............................................购物车
            add_shop_list:function (id) {
                 var item_index=this.find_index(id);
                 if(item_index!==-1){
                     this.shop_list.push(Object.assign({},this.product_list[item_index]));
                 }
            },
            up_add_shop_list:function () {
                s.set('shop_list',this.shop_list);
            }
        },
        watch: {
            product_list: {
                deep: true,
                handler: function () {
                    this.up_product_list();
                }
            },
            new_book_list: {
                deep: true,
                handler: function () {
                    this.up_new_book_list();
                }
            },
            hot_book_list: {
                deep: true,
                handler: function () {
                    this.up_hot_book_list()
                }
            },
            tex_book_list: {
                deep: true,
                handler: function () {
                    this.up_tex_book_list();
                }
            },
            shop_list:{
                deep:true,
                handler:function () {
                    this.up_add_shop_list();
                }
            }
        }
    })
})();