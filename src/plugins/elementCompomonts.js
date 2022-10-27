import Vue from 'vue'
import { Button, Container, Aside, Header, Main, MenuItemGroup, Row, Col, Menu, Submenu, MenuItem, Tooltip, Dropdown, DropdownMenu, DropdownItem, Card, Table, TableColumn } from 'element-ui'

const components = [Button, Container, Aside, Header, Main, MenuItemGroup, Row, Col, Menu, Submenu, MenuItem, Tooltip, Dropdown, DropdownMenu, DropdownItem, Card, Table, TableColumn]

components.forEach(item => Vue.component(item.name, item))
