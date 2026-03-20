window.appState = {
  language: 'es',
  userName: 'Valentina',
  savingsPercent: 5,
  balance: 45200,
  alcanciaMonth: 9340,
  darkMode: false,
  pushNotifications: true,
  onboardingDone: false,
  currentScreen: 'splash',
  currentTab: 'home',
  friends: [
    { name: 'Camila Torres', initials: 'CT', status: 'active', color: '#F4A7B9' },
    { name: 'Sebastián Muñoz', initials: 'SM', status: 'active', color: '#6DC93A' },
    { name: 'Isidora Vega', initials: 'IV', status: 'pending', color: '#F5A623' },
  ],
  friendRequests: [
    { name: 'Diego Fernández', initials: 'DF', color: '#9C27B0' },
  ],
  sharedAlcancias: [
    {
      name: 'Viaje a Bariloche', emoji: '✈️', goal: 600000, accumulated: 187400,
      participants: [
        { name: 'Valentina', initials: 'VR', color: '#6DC93A', contribution: 87400 },
        { name: 'Camila', initials: 'CT', color: '#F4A7B9', contribution: 52000 },
        { name: 'Sebastián', initials: 'SM', color: '#F5A623', contribution: 48000 },
      ]
    },
    {
      name: 'Regalo cumpleaños mamá', emoji: '🎂', goal: 80000, accumulated: 52000,
      participants: [
        { name: 'Valentina', initials: 'VR', color: '#6DC93A', contribution: 28000 },
        { name: 'Camila', initials: 'CT', color: '#F4A7B9', contribution: 24000 },
      ]
    }
  ],
  goals: [
    { name: 'Vacaciones en el norte', emoji: '✈️', goal: 500000, accumulated: 312400, shared: false },
    { name: 'Celular nuevo', emoji: '📱', goal: 350000, accumulated: 350000, shared: false },
    { name: 'Fondo de emergencia', emoji: '🛡️', goal: 400000, accumulated: 87200, shared: false },
  ],
  transactions: [
    { commerce: 'Starbucks', icon: '☕', amount: 4900, micro: true, alcancia: 245, date: '2026-03-19', category: 'Café' },
    { commerce: 'Jumbo', icon: '🛒', amount: 32400, micro: false, alcancia: 0, date: '2026-03-18', category: 'Supermercado' },
    { commerce: 'Metro Santiago', icon: '🚇', amount: 1550, micro: true, alcancia: 78, date: '2026-03-18', category: 'Transporte' },
    { commerce: 'Farmacias Cruz Verde', icon: '💊', amount: 8200, micro: true, alcancia: 410, date: '2026-03-17', category: 'Salud' },
    { commerce: 'Rappi', icon: '🛵', amount: 19800, micro: true, alcancia: 990, date: '2026-03-16', category: 'Delivery' },
    { commerce: 'Líder', icon: '🏪', amount: 41700, micro: false, alcancia: 0, date: '2026-03-15', category: 'Supermercado' },
    { commerce: 'Copec', icon: '⛽', amount: 15300, micro: true, alcancia: 765, date: '2026-03-14', category: 'Combustible' },
    { commerce: 'Uber', icon: '🚗', amount: 6800, micro: true, alcancia: 340, date: '2026-03-13', category: 'Transporte' },
    { commerce: 'McDonalds', icon: '🍔', amount: 7500, micro: true, alcancia: 375, date: '2026-03-12', category: 'Comida' },
    { commerce: 'Netflix', icon: '🎬', amount: 12990, micro: true, alcancia: 650, date: '2026-03-11', category: 'Entretenimiento' },
    { commerce: 'Falabella', icon: '🏬', amount: 65000, micro: false, alcancia: 0, date: '2026-03-10', category: 'Tienda' },
    { commerce: 'PedidosYa', icon: '🛵', amount: 11200, micro: true, alcancia: 560, date: '2026-03-09', category: 'Delivery' },
  ],
  previousAlcancias: [
    { month: 'Febrero 2026', amount: 164800 },
    { month: 'Enero 2026', amount: 178200 },
    { month: 'Diciembre 2025', amount: 155600 },
    { month: 'Noviembre 2025', amount: 171400 },
    { month: 'Octubre 2025', amount: 143900 },
    { month: 'Septiembre 2025', amount: 168300 },
  ],
  microBreakdown: [
    { commerce: 'Starbucks', amount: 245, date: '19 Mar' },
    { commerce: 'Metro Santiago', amount: 78, date: '18 Mar' },
    { commerce: 'Cruz Verde', amount: 410, date: '17 Mar' },
    { commerce: 'Rappi', amount: 990, date: '16 Mar' },
    { commerce: 'Copec', amount: 765, date: '14 Mar' },
    { commerce: 'Uber', amount: 340, date: '13 Mar' },
    { commerce: 'McDonalds', amount: 375, date: '12 Mar' },
    { commerce: 'Netflix', amount: 650, date: '11 Mar' },
    { commerce: 'PedidosYa', amount: 560, date: '9 Mar' },
  ]
};
