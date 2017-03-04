/**
 * Created by gantrylau on 2017/2/22.
 */
export const GET_MENU_TREE   = 'menu/GET_MENU_TREE';
export const GET_MENU_LIST   = 'menu/GET_MENU_LIST';


function formatMenusData(menus, parentAlias) {
    let result = [];
    if (!menus)
        menus = [];
    for (let menu of menus) {
        if (menu.parentAlias === parentAlias || (!menu.parentAlias && !parentAlias)) {
            menu.children = formatMenusData(menus, menu.alias);
            result.push(menu);
        }
    }
    return result;
}

export default {
    [GET_MENU_TREE]  : state => {
        return formatMenusData(state.menus, null);
    },
    [GET_MENU_LIST]  : state => {
        return state.menus
    }
}