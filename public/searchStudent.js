  let searchStudents = (str) => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        let jsonObj = JSON.parse(this.responseText);

        if (jsonObj.length === 0) {
          let row = document.createElement("tr");
          let cell = document.createElement("td");
          cell.setAttribute("colspan", "8");
          cell.innerHTML = `<center><h3>No Data Available 😓...!!</h3></center>`;
          row.appendChild(cell);
          tableBody.appendChild(row);
          return;
        }

        jsonObj.forEach((item, index) => {
          let row = document.createElement("tr");
          row.classList.add("student-row");

          const date = new Date(item.created_at);

          row.innerHTML = `
            <td data-label="SRNO.">${index + 1}</td>
            <td data-label="Name">${item.name}</td>
            <td data-label="Email">${item.email}</td>
            <td data-label="Password">••••••••</td>
            <td data-label="Role">${item.role}</td>
            <td data-label="Date">${date.toLocaleString()}</td>
            <td data-label="Delete">
              <a class="btn delete" href="/deleteStudent?id=${item.id}" 
                onclick="return confirm('Are you sure you want to delete this student data?')">
                DELETE
              </a>
            </td>
            <td data-label="Update">
              <a class="btn update" href="/update?id=${item.id}">UPDATE</a>
            </td>
          `;
          tableBody.appendChild(row);
        });
      }
    };

    xhttp.open("GET", "/search?sd=" + encodeURIComponent(str), true);
    xhttp.send();
  };
