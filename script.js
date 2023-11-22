const CrudApi = {
    root: "https://crudcrud.com/api/b5d88cec43d04f95ba3cd9f94db3e38f/appointmentdatadeletion",
  };
  
  var parentElem = 0;
  async function formsubmit(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const ph_no = event.target.no.value;
    const obj = {
      name,
      email,
      ph_no,
    };
    const response = await axios.post(CrudApi.root, obj);
    showUSersonScreen(response.data);
    document.getElementById("my-form").reset();
  }
  function showUSersonScreen(obj) {
    console.log(obj);
    var childElem = `<div id=${obj._id} class="d-flex justify-content-between border align-items-center text-center"> ${obj.name}-${obj.email}-${obj.ph_no}
      <button class="btn btn-primary w-25 h-25" onclick=deleteUser('${obj._id}') >Delete</button> <button class="btn btn-primary w-25 h-25 ms-2" onclick=editUser('${obj._id}') >edit</button>
      </div>`;
    var parentElem = document.getElementById("listOfitems");
    parentElem.innerHTML += childElem;
  }
  
  async function editUser(objId) {
    const response = await axios.get(`${CrudApi.root}/${objId}`);
    await axios.delete(`${CrudApi.root}/${objId}`);
  
    document.getElementById("name").value = response.data.name;
    document.getElementById("email").value = response.data.email;
    document.getElementById("ph_no").value = response.data.ph_no;
    const parentElem = document.getElementById("listOfitems");
    const childElem = document.getElementById(objId);
    if (childElem) {
      parentElem.removeChild(childElem);
    }
  }
  
  async function deleteUser(objId) {
    await axios.delete(`${CrudApi.root}/${objId}`);
    const parentElem = document.getElementById("listOfitems");
    const childElem = document.getElementById(objId);
    if (childElem) {
      parentElem.removeChild(childElem);
    }
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    const response = await axios.get(CrudApi.root);
  
    for (var i = 0; i < response.data.length; i++) {
      showUSersonScreen(response.data[i]);
    }
  });