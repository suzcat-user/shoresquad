// ...existing code...
// Basic app module: geolocation, weather (OpenWeatherMap), and Leaflet map.
// Replace YOUR_OPENWEATHERMAP_API_KEY with your key.

const OPEN_WEATHER_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // <-- add your API key
const weatherEl = document.getElementById('weatherCard');
const weatherLoading = document.getElementById('weatherLoading');
const eventsList = document.getElementById('eventsList');
const locateBtn = document.getElementById('locateBtn');

let map, markersLayer;

function initMap() {
    map = L.map('map', { zoomControl: true }).setView([34.05, -118.25], 10); // default to LA
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    markersLayer = L.layerGroup().addTo(map);

    // sample event marker
    addEventMarker({id:1, title:'Santa Monica Cleanup', lat:34.009, lng:-118.496, date:'2025-12-07'});
    renderEvents(sampleEvents());
}

function addEventMarker(event){
    const marker = L.marker([event.lat, event.lon ?? event.lng ?? event.lng2 ?? event.lat]).addTo(markersLayer);
    marker.bindPopup(`<strong>${escapeHtml(event.title)}</strong><br>${event.date || ''}`);
}

function renderEvents(events){
    eventsList.innerHTML = '';
    events.forEach(e => {
        const li = document.createElement('li');
        li.innerHTML = `<div>
            <strong>${escapeHtml(e.title)}</strong>
            <div class="muted">${escapeHtml(e.date)} • ${escapeHtml(e.location)}</div>
        </div>
        <div><button class="btn outline" data-id="${e.id}">View</button></div>`;
        eventsList.appendChild(li);
    });
}

function sampleEvents(){
    return [
        {id:1, title:'Sunset Beach Cleanup', date:'Dec 12, 2025', location:'Sunset Park', lat:33.712, lng:-118.293},
        {id:2, title:'Pier 16 Crew', date:'Dec 20, 2025', location:'Pier 16', lat:34.010, lng:-118.496},
        {id:3, title:'Dune Day', date:'Jan 3, 2026', location:'North Shore', lat:33.95, lng:-118.3}
    ];
}





// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    locateBtn.addEventListener('click', locateAndShow);

    // Signup form (demo)
    const form = document.getElementById('signupForm');
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        if(!name || !email) return;
        // For now, just show a friendly message
        alert(`Thanks ${name}! We'll notify ${email} about events.`);
        form.reset();
    });
});