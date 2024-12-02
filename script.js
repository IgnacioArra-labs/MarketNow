new Vue({
  el: '#app',
  data: {
    search: '',
    searchPuesto: '',
    items: [
      { name: 'Manzana', price: 200, change: 5, history: [190, 195, 200, 210] },
      { name: 'Banana', price: 150, change: -2, history: [155, 152, 150, 148] },
      { name: 'Papa', price: 80, change: 1.5, history: [78, 79, 80, 81] },
      { name: 'Tomate', price: 120, change: 3.2, history: [115, 118, 120, 124] },
      { name: 'Cebolla', price: 60, change: -4, history: [65, 63, 62, 60] },
      { name: 'Zanahoria', price: 50, change: 2.5, history: [48, 49, 50, 51] },
      { name: 'Pimiento', price: 100, change: -3, history: [105, 102, 100, 98] },
      { name: 'Lechuga', price: 35, change: 1.8, history: [34, 34.5, 35, 35.5] },
      { name: 'Espinaca', price: 40, change: -1.2, history: [41, 40.5, 40, 39.5] },
      { name: 'Ajo', price: 250, change: 4.5, history: [240, 245, 250, 260] },
      { name: 'Calabaza', price: 70, change: -2.8, history: [72, 71, 70, 68] },
      { name: 'Choclo', price: 30, change: 0.5, history: [29.8, 30, 30.2, 30.3] },
      { name: 'Perejil', price: 25, change: -1, history: [25.5, 25.2, 25, 24.8] },
      { name: 'Apio', price: 45, change: 2, history: [44, 44.5, 45, 46] },
      { name: 'Sandía', price: 90, change: 3.7, history: [85, 87, 90, 93] },
      { name: 'Melón', price: 120, change: -2.5, history: [125, 123, 120, 117] },
      { name: 'Naranja', price: 100, change: 2.3, history: [97, 98.5, 100, 102] },
      { name: 'Mandarina', price: 80, change: -1.8, history: [82, 81, 80, 79] },
      { name: 'Frutilla', price: 250, change: 5.6, history: [235, 240, 250, 260] },
      { name: 'Uva', price: 180, change: 3, history: [175, 178, 180, 185] },
      { name: 'Limón', price: 50, change: -2.5, history: [52, 51, 50, 49] },
      { name: 'Pera', price: 150, change: 2, history: [145, 148, 150, 153] },
      { name: 'Durazno', price: 200, change: -1.5, history: [205, 202, 200, 198] },
      { name: 'Ananá', price: 300, change: 3.2, history: [290, 295, 300, 310] },
    ],
    puestos: [
      {
        nombre: 'Puesto de Pepe',
        productos: [
          { name: 'Lechuga', price: 35 },
          { name: 'Tomate', price: 120 }
        ],
        rating: 4.9
      },
      {
        nombre: 'Verduras La Esquina',
        productos: [
          { name: 'Papa', price: 80 },
          { name: 'Cebolla', price: 60 }
        ],
        rating: 4.5
      },
      {
        nombre: 'Frutas Rojas',
        productos: [
          { name: 'Frutilla', price: 250 },
          { name: 'Sandía', price: 90 }
        ],
        rating: 4.7
      },
      {
        nombre: 'El Mercado Central',
        productos: [
          { name: 'Melón', price: 120 },
          { name: 'Naranja', price: 100 }
        ],
        rating: 4.3
      }
    ]
  },
  computed: {
    filteredItems() {
      return this.items.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    filteredPuestos() {
      return this.puestos.filter(puesto =>
        puesto.nombre.toLowerCase().includes(this.searchPuesto.toLowerCase())
      );
    },
    mejoresPuestos() {
      return [...this.puestos]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
    }
  },
  mounted() {
    this.renderCharts();
  },
  methods: {
    renderCharts() {
      this.items.forEach(item => {
        const ctx = document.getElementById('chart-' + item.name).getContext('2d');

        // Crear degradado de color para el área bajo la línea
        const gradient = ctx.createLinearGradient(0, 0, 0, 150);
        gradient.addColorStop(0, 'rgba(243, 186, 47, 0.4)'); 
        gradient.addColorStop(1, 'rgba(243, 186, 47, 0.1)'); 

        // Configuración del gráfico
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Hace 3 días', 'Hace 2 días', 'Ayer', 'Hoy'],
            datasets: [{
              label: 'Precio',
              data: item.history,
              borderColor: '#f3ba2f', 
              backgroundColor: gradient, 
              borderWidth: 3,
              tension: 0.3, 
              pointRadius: 5, 
              pointBackgroundColor: '#f3ba2f',
              pointBorderWidth: 2,
              pointHoverRadius: 7, 
              pointHoverBackgroundColor: '#ffffff', 
              pointHoverBorderColor: '#f3ba2f',
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                display: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)', 
                },
                ticks: {
                  color: '#e0e0e0', 
                  font: {
                    family: 'Poppins',
                    size: 12,
                  },
                },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)', 
                },
                ticks: {
                  color: '#e0e0e0', 
                  font: {
                    family: 'Poppins',
                    size: 12,
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
                backgroundColor: '#1c212d',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderWidth: 1,
                borderColor: '#f3ba2f',
                cornerRadius: 5,
                caretPadding: 10,
              },
            },
            elements: {
              line: {
                borderCapStyle: 'round',
              },
            },
          },
        });
      });
    },
  },
});
