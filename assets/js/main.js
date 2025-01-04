

document.addEventListener('DOMContentLoaded', function() {
    var carModal = document.getElementById('carModal')
    var galleryItems = document.querySelectorAll('.gallery-item')
    galleryItems.forEach(function(item) {
        item.addEventListener('click', function (event) {
            var button = event.currentTarget
            var carImage = button.getAttribute('data-car-image')
            var modalBodyImage = carModal.querySelector('#modalCarImage')
            modalBodyImage.src = carImage
        })
    })
})
















// Business location
const businessLocation = [37.374990, -5.975537];

// Initialize the map
const map = L.map('map').setView(businessLocation, 13);

// Add a natural color tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Add a marker for the business location
const businessMarker = L.marker(businessLocation)
    .addTo(map)
    .bindPopup('Estamos aquí.<br> ¡Visítanos!')
    .openPopup();

let routingControl;

// Function to get user's location and show route
function showRouteToUser() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            
            // Add a marker for the user's location
            L.marker(userLocation)
                .addTo(map)
                .bindPopup('Tu ubicación')
                .openPopup();

            // Remove existing routing control if it exists
            if (routingControl) {
                map.removeControl(routingControl);
            }
            // Fit the map to show both locations
            const bounds = L.latLngBounds(businessLocation, userLocation);
            map.fitBounds(bounds, { padding: [50, 50] });
        }, function(error) {
            console.error("Error getting user's location:", error);
            alert("No se pudo obtener tu ubicación. Por favor, verifica los permisos de ubicación en tu navegador.");
        });
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }
}

// Add event listener to the show route button
document.getElementById('showRouteBtn').addEventListener('click', showRouteToUser);

// Call the function when the page loads to show the initial map
window.addEventListener('load', function() {
    map.invalidateSize();
});









document.getElementById('contactForm').addEventListener('submit', function(event) {
    let form = event.target;
    let valid = true;

    // Validate Nombre
    let nombre = form.nombre;
    if (!nombre.value.match(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{3,40}$/)) {
        valid = false;
        alert('Por favor, ingrese un nombre válido.');
    }

    // Validate Apellidos
    let apellidos = form.apellidos;
    if (!apellidos.value.match(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{4,60}$/)) {
        valid = false;
        alert('Por favor, ingrese apellidos válidos.');
    }

    // Validate Email
    let email = form.email;
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        valid = false;
        alert('Por favor, ingrese un correo electrónico válido.');
    }

    // Validate Teléfono
    let telefono = form.telefono;
    if (!telefono.value.match(/^[0-9]{9}$/)) {
        valid = false;
        alert('Por favor, ingrese un número de teléfono válido.');
    }

    if (!valid) {
        event.preventDefault();
    }
});