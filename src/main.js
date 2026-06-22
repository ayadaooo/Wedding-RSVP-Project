const cursor = document.createElement("div");
cursor.id = "cursor";
document.body.appendChild(cursor);

window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const idGet = new URLSearchParams(window.location.search);

const userId = idGet.get("id");
console.log(userId);

const rsvpAPI = fetch(
  "https://script.google.com/macros/s/AKfycbxFa8kJRru2cxofF6UU2VsFM6uwJU0BJoSVAjki4s9zJ8R0V75x5p6-4usdjDZv1iSkZA/exec",
)
  .then((response) => response.json())
  .then((data) => {
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "none";
    const foundGuest = data.find((guest) => guest.id === userId);
    console.log(foundGuest);

    const nameDisplay = document.querySelector("#nameDisplay");
    nameDisplay.textContent = `Hello ${foundGuest.firstName} ${foundGuest.lastName}! Seats: ${foundGuest.seats}`;

    const yes = document.querySelector(".yes");
    const no = document.querySelector(".no");

    const responseMsg = document.querySelector("#responseMsg");

    const yesClick = (e) => {
      console.log("yes clicked");
      foundGuest.status = "Confirmed";
      console.log(foundGuest.status);
      responseMsg.textContent = `Thank you ${foundGuest.firstName} ${foundGuest.lastName}! You are now confirmed!`;
      yes.classList.add("selected");
      yes.disabled = true;
      no.disabled = true;
      fetch(
        "https://script.google.com/macros/s/AKfycbxFa8kJRru2cxofF6UU2VsFM6uwJU0BJoSVAjki4s9zJ8R0V75x5p6-4usdjDZv1iSkZA/exec",
        {
          method: "POST",
          body: JSON.stringify({ id: foundGuest.id, status: "Confirmed" }),
        },
      );
    };
    const noClick = (e) => {
      console.log("no clicked");
      foundGuest.status = "Rejected";
      console.log(foundGuest.status);
      responseMsg.textContent = `Thank you ${foundGuest.firstName} ${foundGuest.lastName}! We understand you can't make it, we wish you the best!`;
      no.classList.add("selected");
      yes.disabled = true;
      no.disabled = true;
      fetch(
        "https://script.google.com/macros/s/AKfycbxFa8kJRru2cxofF6UU2VsFM6uwJU0BJoSVAjki4s9zJ8R0V75x5p6-4usdjDZv1iSkZA/exec",
        {
          method: "POST",
          body: JSON.stringify({ id: foundGuest.id, status: "Rejected" }),
        },
      );
    };

    yes.addEventListener("click", yesClick);
    no.addEventListener("click", noClick);
    console.log(data);
  });

// function generateIDs() {
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
//   const data = sheet.getDataRange().getValues();

//   for (let i = 1; i < data.length; i++) {
//     const row = data[i];
//     let guestId = row[3];
//     if (row[3] === "" || row[3] === "UNIQUE ID") {
//       guestId = Utilities.getUuid().slice(0, 8);
//       sheet.getRange(i + 1, 4).setValue(guestId);
//     }
//     if (row[5] === "") {
//       const newLink = `https://jaysonleirsvp.netlify.app/?id=${guestId}`;
//       sheet.getRange(i + 1, 6).setValue(newLink);
//     }
//     if (row[6] === "") {
//       const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://jaysonleirsvp.netlify.app/?id=${guestId}`;
//       sheet.getRange(i + 1, 7).setValue(qrCode);
//     }
//   }
// }

// generating ids manually
// function generateMissingIds() {
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
//   const data = sheet.getDataRange().getValues();

//   for (let i = 1; i < data.length; i++) {
//     const row = data[i];
//     if (row[3] === "" || row[3] === "UNIQUE ID") {
//       const newId = Utilities.getUuid().slice(0, 8);
//       sheet.getRange(i + 1, 4).setValue(newId);
//     }
//   }
// }

// function generateNewLink() {
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
//   const data = sheet.getDataRange().getValues();

//   for (let i = 1; i < data.length; i++) {
//     const row = data[i];
//     if (row[5] === "") {
//       const newLink = `https://jaysonleirsvp.netlify.app/?id=${row[3]}`;
//       sheet.getRange(i + 1, 6).setValue(newLink);
//     }
//   }
// }

// function generateQrCode() {
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
//   const data = sheet.getDataRange().getValues();

//   for (let i = 1; i < data.length; i++) {
//     const row = data[i];
//     if (row[6] === "") {
//       const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://jaysonleirsvp.netlify.app/?id=${row[3]}`;
//       sheet.getRange(i + 1, 7).setValue(qrCode);
//     }
//   }
// }
