const teachersCard = document.querySelector(".teacher-card__container");

let selected = null;
let order = "asc";
let students = "";
let search = "";
let married;
let page = 1;
let pages;

async function getTeachersData() {
  teachersCard.innerHTML = "Loading...";
  let params = {
    isMarried: married,
    lastName: search,
    orderBy: "firstName",
    order,
  };
  const res = await request.get(`teacher`, { params });
  teachersCard.innerHTML = "";
  console.log(res.data);
  res.data.map((teacher) => {
    teachersCard.innerHTML += getTeachersCard(teacher);
  });
}
getTeachersData();

/////////////////////// Function deleted
async function deleteTeacherData(teacherid) {
  await request.delete(`teacher/${teacherid}`);
  getTeachersData();
}

////////////////// Function modal
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let teacher = {
    firstName: this.firstName.value,
    lastName: this.lastName.value,
    email: this.email.value,
    phoneNumber: this.phoneNumber.value,
    isMarried: this.chek.checked,
  };
  if (selected === null) {
    await request.post("teacher", teacher);
  } else {
    await request.put(`teacher/${selected}`, teacher);
  }
  this.reset();
  getTeachersData();
});

async function openModal(teacherid) {
  modal.style.top = 0;
  let { data } = await request.get(`teacher/${teacherid}`);
  selected = teacherid;
  modalBtn.textContent = "Edit teacher date";
  document.getElementById("firstName").value = data.firstName;
  document.getElementById("lastName").value = data.lastName;
  document.getElementById("phoneNumber").value = data.phoneNumber;
  document.getElementById("email").value = data.email;
  document.getElementById("chek").checked = data.isMarried;
}

addBtn.addEventListener("click", () => {
  modal.style.top = 0;
  selected = null;
  modalBtn.textContent = "Add teacher";
});

closeBtn.addEventListener("click", function modalCloseFunction() {
  modal.style.top = "-150%";
});

/////////////////////// Function filter
filterSelect.addEventListener("change", function () {
  order = this.value;
  getTeachersData();
});

marriedSelect.addEventListener("change", function () {
  married = this.value;
  getTeachersData();
});

const getTeachersCard = (teacher) => {
  return `
            <div class="card">
            <div class="card__title">
              <div class="card-img">
                <img
                  src="${teacher.avatar}"
                  alt="IMG"
                />
              </div>
              <div class="card-title">
                <h1 class="firstName">${teacher.firstName}</h1>
                <span><h1 class="lastName">${teacher.lastName}</h1></span>
                <span><p>| ID: ${teacher.id}</p></span>
              </div>
            </div>
            <div class="card_descripion">
              <div class="social">
                <div class="gmail">
                  <a href="${teacher.email}">
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140-685v465h680v-465L480-462Zm0-60 336-218H145l335 218ZM140-685v-55 520-465Z"/></svg>
                  </a>
                </div>
                <div class="instagram">
                  <a href="https://www.instagram.com">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                  </a>
                </div>
                <div class="telegram">
                  <a href="t.me:@AS5171">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
                  </a>
                </div>
              </div>
              <div class="groups">
                <a href="tel:+998996492639">Phone:${teacher.phoneNumber}</a>
                <p>isMarried: ${teacher.isMarried ? "Married" : "Single"}</p>
              </div>
              <div class="buttons">
                <button class="btn edit-btn" onclick="openModal(${
                  teacher.id
                })">Edit</button>
                <button class="btn delet-btn" onclick="deleteTeacherData(${
                  teacher.id
                })">Delete</button> 
                  <button class="btn student-btn" onclick="openStudents(${
                    teacher.id
                  })">Students</button>
              </div>
            </div>
          </div>
            `;
};

const openStudents = (id) => {
  window.location = `students.html?teacher=${id}`;
};

searchInput.addEventListener("keyup", function () {
  search = this.value;
  page = 1;
  getTeachersData();
});
