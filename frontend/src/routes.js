import ClienteList from './components/layouts/ClienteList';
import Cadastrar from './components/layouts/Cadastrar';
import Editar from './components/layouts/Editar';

const routes = [
    {
        path:'/',
        name:'home',
        component: ClienteList
    },
    {
        path:'/cadastrar',
        name:'cadastrar',
        component: Cadastrar
    },
    {
        path:'/editar',
        name:'editar',
        component:Editar
    }
]

export default routes;