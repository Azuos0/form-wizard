import ClienteList from './components/layouts/ClienteList';
import ProfissionalList from './components/layouts/ProfissionalList';
import Home from './components/layouts/Home';
import FormWizard from './components/layouts/FormWizard';

// import Editar from './components/layouts/Editar';

const routes = [
    {
        path:'/',
        name:'home',
        component: Home
    },
    {
        path:'/clientes',
        name:'clientes',
        component: ClienteList
    },
    {
        path:'/cadastrarCliente',
        name:'cadastrarCliente',
        component: FormWizard,
    },
    {
        path:'/editarCliente/:id',
        name:'editarCliente',
        component: FormWizard,
        props: true
    },
    {
        path:'/profissionais',
        name:'profissionais',
        component: ProfissionalList
    },
    {
        path:'/cadastrarProfissional',
        name:'cadastrarProfissional',
        component: FormWizard
    },
    {
        path:'/editarProfissional/:id',
        name:'editarProfissional',
        component: FormWizard,
        props: true
    },
]

export default routes;