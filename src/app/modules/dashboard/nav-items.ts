export interface NavItem {
  path: string;
  title: string;
  icon?: string;
  allowedRoles: string[];
}

const links: NavItem[] = [
  {
    path: '',
    title: 'Dashboard',
    icon: 'dashboard',
    allowedRoles: ['Usuario', 'administrador'],
  },
  {
    path: 'students/studentsList',
    title: 'Alumnos',
    icon: 'people',
    allowedRoles: ['Usuario', 'administrador'],
  },
  {
    path: 'courses/coursesList',
    title: 'Cursos',
    icon: 'business',
    allowedRoles: ['Usuario', 'administrador'],
  },
  {
    path: 'inscriptions/inscriptionsList',
    title: 'Inscripciones',
    icon: 'toll',
    allowedRoles: ['administrador'],
  }
]

export default links;
