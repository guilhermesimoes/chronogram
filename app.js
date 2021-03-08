let timeline = document.querySelector('.timeline');
let itemCreator = document.querySelector('.item-creator');
let addButton = document.querySelector('.add-item-button');
let treatmentSelect = document.querySelector('.item-creator select[name="treatment"]');

function add(event) {
  let formData = new FormData(itemCreator);
  let data = Object.fromEntries(formData.entries());
  let itemTemplate = `
    <div class="item">
      <div class="price">${data.price}€</div>
      <img class="image" src="image.jpeg"></img>
      <div class="duration">${data.duration}</div>
      <div class="treatment">${data.treatment}</div>
      <ul class="steps">
        ${data.procedures.split('\n').map(l => l.trim()).filter(l => l).map(l => `<li>${l}</li>`).join('')}
      </ul>
      <button class="remove-item-button">⨯</button
    </div>
  `;
  incrementTreatment();
  timeline.insertAdjacentHTML('beforeend', itemTemplate);
  itemCreator.reset();
  event.preventDefault();
}

function incrementTreatment() {
  let nextOptionIndex = treatmentSelect.selectedIndex + 2;
  let nextOption = treatmentSelect.querySelector(`option:nth-of-type(${nextOptionIndex})`);
  if (nextOption) {
    let currentOption = treatmentSelect.querySelector(`option[selected]`);
    currentOption.removeAttribute('selected');
    nextOption.setAttribute('selected', '');
  }
}

function remove(event) {
  if (event.target.classList.contains('remove-item-button')) {
    let item = event.target.closest('.item');
    if (item) {
      item.remove();
    }
    event.preventDefault();
  }
}

addButton.addEventListener('click', add);
timeline.addEventListener('click', remove);

// let itemTemplate = `
//   <div class="item">
//     <div class="price">1000€</div>
//     <img class="image" src="image.jpeg"></img>
//     <div class="duration">2h</div>
//     <div class="treatment">Cirurgia</div>
//     <ul class="steps">
//       <li>Impressões para enceramento e guia cirúrgica</li>
//       <li>Scanneamento facial</li>
//     </ul>
//     <button class="remove-item-button">⨯</button
//   </div>
// `;

// for (let i=0; i < 5; i++) {
//   itemCreator.insertAdjacentHTML('beforebegin', itemTemplate);
// }
