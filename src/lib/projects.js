const projects = [
  {
    slug: 'zhk-kandinskiy',
    title: 'ЖК «Кандинский»',
    meta: '148 м² · реализация под ключ',
    image: 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/1d475d74f_generated_d8f4b13f.png',
    alt: 'Гостиная с камином, натуральным деревом и тёплым вечерним светом',
    wide: true,
    description: 'Просторная квартира в жилом комплексе «Кандинский» — проект, где классические пропорции встречаются с современным комфортом. Мы переосмыслили планировку, объединив гостиную, столовую и кухню в единое светлое пространство. Натуральные материалы — дуб, мрамор, латунь — создают тёплую, камерную атмосферу. Каминный портал стал смысловым центром гостиной, а скрытые системы хранения и инженерные решения обеспечили безупречный порядок.',
    gallery: [
      'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/1d475d74f_generated_d8f4b13f.png',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
      'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?w=800&q=80',
    ],
  },
  {
    slug: 'clever-park',
    title: 'Clever park',
    meta: '92 м² · проект + комплектация',
    image: 'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/c9a039afa_generated_7fd7e794.png',
    alt: 'Современная кухня с деревянными фасадами, каменным островом и латунными деталями',
    wide: false,
    description: 'Квартира в Clever park для молодой пары — лаконичный, функциональный интерьер с акцентом на текстуры и свет. Кухня-гостиная с каменным островом стала сердцем дома: здесь готовят, принимают гостей и проводят вечера. Деревянные фасады, микроцемент и тёплая подсветка создают уют, а продуманная эргономика делает каждый квадратный метр рабочим.',
    gallery: [
      'https://media.base44.com/images/public/6a25b90cc69d8cc1446d8488/c9a039afa_generated_7fd7e794.png',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
    ],
  },
];

export default projects;

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}