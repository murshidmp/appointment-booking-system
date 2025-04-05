(function() {
    // Set the API base URL (update with your EC2 public IP or domain)
    const API_BASE_URL = 'http://localhost:3000/appointments';
  
    // DOM Elements
    const dateInput = document.getElementById('date');
    const slotsContainer = document.getElementById('slotsContainer');
    const selectedSlotDisplay = document.getElementById('selectedSlot');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const bookBtn = document.getElementById('bookBtn');
    const messageEl = document.getElementById('message');
  
    let selectedSlot = '';
  
    // Function to generate all possible time slots (10:00 to 17:00 excluding 13:00)
    function generateAllSlots() {
      const slots = [];
      for (let hour = 10; hour < 17; hour++) {
        if (hour === 13) continue; // Skip break hour
        for (let minute of [0, 30]) {
          slots.push(`${hour.toString().padStart(2, '0')}:${minute === 0 ? '00' : '30'}`);
        }
      }
      return slots;
    }
  
    // Render slots as buttons with color indicating availability
    async function renderSlots(date) {
      slotsContainer.innerHTML = '';
      selectedSlot = '';
      selectedSlotDisplay.textContent = '';
  
      const allSlots = generateAllSlots();
  
      // Fetch available slots from the backend
      let availableSlots = [];
      try {
        const response = await fetch(`${API_BASE_URL}/slots?date=${date}`);
        if (!response.ok) throw new Error('Error fetching slots');
        availableSlots = await response.json();
      } catch (error) {
        console.error(error);
        messageEl.textContent = 'Error fetching slots';
      }
  
      // Render each slot with appropriate color
      allSlots.forEach(slot => {
        const isAvailable = availableSlots.includes(slot);
        const slotBtn = document.createElement('button');
        slotBtn.textContent = slot;
        slotBtn.className = `py-2 px-4 rounded text-white ${isAvailable ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 cursor-not-allowed'}`;
        slotBtn.disabled = !isAvailable;
        slotBtn.addEventListener('click', () => {
          document.querySelectorAll('#slotsContainer button').forEach(btn => {
            btn.classList.remove('ring-2', 'ring-blue-500');
          });
          slotBtn.classList.add('ring-2', 'ring-blue-500');
          selectedSlot = slot;
          selectedSlotDisplay.textContent = slot;
        });
        slotsContainer.appendChild(slotBtn);
      });
    }
  
    // Initialize the UI: set today's date and render slots
    function init() {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
      renderSlots(today);
    }
  
    // Refresh slots when date changes
    dateInput.addEventListener('change', (e) => {
      renderSlots(e.target.value);
    });
  
    // Book the appointment when the booking button is clicked
    bookBtn.addEventListener('click', async () => {
      const name = nameInput.value;
      const phone = phoneInput.value;
      const date = dateInput.value;
  
      if (!name || !phone || !selectedSlot) {
        messageEl.textContent = 'Please enter your details and select a time slot.';
        return;
      }
  
      try {
        const response = await fetch(`${API_BASE_URL}/book`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, date, timeSlot: selectedSlot })
        });
        const result = await response.json();
        if (response.ok) {
          messageEl.textContent = 'Appointment booked successfully!';
          renderSlots(date); // Refresh slots after booking
        } else {
          messageEl.textContent = result.message || 'Booking failed';
        }
      } catch (error) {
        console.error(error);
        messageEl.textContent = 'Error booking appointment';
      }
    });
  
    // Initialize on page load
    init();
  })();
  