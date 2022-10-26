import Vue from 'vue'
import App from './App.vue'
import { Button, Container, Aside, Header, Main, MenuItemGroup, Row, Col, Menu, Submenu, MenuItem, Tooltip, Dropdown, DropdownMenu, DropdownItem, Card } from 'element-ui';
import router from './router'
import store from '@/vuex'

Vue.config.productionTip = false

Vue.component(Button.name, Button);
Vue.component(Container.name, Container);
Vue.component(Aside.name, Aside);
Vue.component(Header.name, Header);
Vue.component(Main.name, Main);
Vue.component(MenuItemGroup .name, MenuItemGroup );
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Card.name, Card);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
