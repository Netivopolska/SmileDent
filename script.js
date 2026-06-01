const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const formularz = document.getElementById("formularz");
const komunikat = document.getElementById("komunikat");
const openButtons = document.querySelectorAll(".open-modal");
const dataInput = document.getElementById("data");
const godzinyBox = document.getElementById("godziny");
const listaWizyt = document.getElementById("listaWizyt");

const godziny = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00"
];

let wybranaGodzina = "";
let wizyty = JSON.parse(localStorage.getItem("wizyty")) || [];

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.add("active");
    pokazGodziny();
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

dataInput.addEventListener("change", () => {
  wybranaGodzina = "";
  pokazGodziny();
});

function pokazGodziny(){
  godzinyBox.innerHTML = "";

  const wybranaData = dataInput.value;

  godziny.forEach((godzina) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = godzina;
    btn.classList.add("godzina");

    const zajeta = wizyty.some((wizyta) => {
      return wizyta.data === wybranaData && wizyta.godzina === godzina;
    });

    if (zajeta) {
      btn.classList.add("zajeta");
      btn.disabled = true;
    }

    if (godzina === wybranaGodzina) {
      btn.classList.add("aktywna");
    }

    btn.addEventListener("click", () => {
      wybranaGodzina = godzina;
      pokazGodziny();
    });

    godzinyBox.appendChild(btn);
  });
}

formularz.addEventListener("submit", (e) => {
  e.preventDefault();

  const imie = document.getElementById("imie").value;
  const usluga = document.getElementById("usluga").value;
  const data = document.getElementById("data").value;

  if (!wybranaGodzina) {
    alert("Wybierz godzinę wizyty.");
    return;
  }

  const nowaWizyta = {
    imie: imie,
    usluga: usluga,
    data: data,
    godzina: wybranaGodzina
  };

  wizyty.push(nowaWizyta);
  localStorage.setItem("wizyty", JSON.stringify(wizyty));

  komunikat.style.display = "block";
  komunikat.textContent =
    `Zarezerwowano: ${imie}, ${usluga}, ${data}, godzina ${wybranaGodzina}.`;

  formularz.reset();
  wybranaGodzina = "";
  pokazGodziny();
  pokazWizyty();
});

function pokazWizyty(){
  listaWizyt.innerHTML = "";

  if (wizyty.length === 0) {
    listaWizyt.innerHTML = "<p>Brak zapisanych wizyt.</p>";
    return;
  }

  wizyty.forEach((wizyta, index) => {
    const div = document.createElement("div");
    div.classList.add("wizyta");

    div.innerHTML = `
      <div>
        <strong>${wizyta.imie}</strong><br>
        ${wizyta.usluga}<br>
        ${wizyta.data}, godz. ${wizyta.godzina}
      </div>
      <button class="usun" onclick="usunWizyte(${index})">Usuń</button>
    `;

    listaWizyt.appendChild(div);
  });
}

function usunWizyte(index){
  wizyty.splice(index, 1);
  localStorage.setItem("wizyty", JSON.stringify(wizyty));
  pokazWizyty();
  pokazGodziny();
}

pokazWizyty();
pokazGodziny();
