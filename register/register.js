let participantCount = 1;

document.getElementById("add").addEventListener("click", function () {
  participantCount++;

  // Insert the new participant before the Add button
  this.insertAdjacentHTML("beforebegin", participantTemplate(participantCount));
});

// Template function that returns ONE new participant section
function participantTemplate(count) {
  return `
    <section class="participant${count} participant">
      <p>Participant ${count}</p>

      <div class="item">
        <label for="fname${count}">First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname${count}" required />
      </div>

      <div class="item">
        <label for="activity${count}">Activity #<span>*</span></label>
        <input id="activity${count}" type="text" name="activity${count}" />
      </div>

      <div class="item">
        <label for="fee${count}">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee${count}" />
      </div>

      <div class="item">
        <label for="date${count}">Desired Date<span>*</span></label>
        <input id="date${count}" type="date" name="date${count}" />
      </div>

      <div class="item">
        <p>Grade</p>
        <select id="grade${count}">
          <option disabled selected></option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>
      </div>
    </section>
  `;
}

// Listen for form submit
document.querySelector("form").addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault(); // stop page reload

  const adultName = document.getElementById("adult_name").value;
  const total = totalFees();

  // Hide the form
  document.querySelector("form").style.display = "none";

  // Show the summary message
  document.getElementById("summary").innerHTML = successTemplate({
    name: adultName,
    participants: participantCount,
    fees: total
  });
}

// Calculate total fees for all participants
function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements]; // Convert NodeList → Array

  return feeElements.reduce((total, input) => {
    const num = Number(input.value);
    return total + (isNaN(num) ? 0 : num);
  }, 0);
}

// Template for success message
function successTemplate(info) {
  return `
    <h2>Registration Complete</h2>
    <p>Thank you <strong>${info.name}</strong> for registering.</p>
    <p>You have registered <strong>${info.participants}</strong> participant(s).</p>
    <p>Total fees owed: <strong>$${info.fees}</strong></p>
  `;
}
