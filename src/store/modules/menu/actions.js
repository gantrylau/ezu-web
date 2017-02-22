/**
 * Created by gantrylau on 2017/2/22.
 */
import Vue from 'vue'

export const FETCH_MENU = 'menu/FETCH_MENU';

export default {
    [FETCH_MENU](context) {
        Vue.http.get('/api/sys/menus').then(function (rsp) {
            context.state.menus = rsp.data.data;
        });
    }
}