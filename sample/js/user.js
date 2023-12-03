function addUserBlock() {
  const container = document.getElementById('userContainer');
  const template = document.getElementById('userTemplate').content.cloneNode(true);
  container.appendChild(template);
}

function createJSON() {
  let usersData = []

  const userBlocks = document.querySelectorAll('.user-block');

  userBlocks.forEach(block => {
    let userData = {
      id: block.querySelector('.user_id').value,
      name: block.querySelector('.user_name').value,
      age: block.querySelector('.user_age').value,
      email: block.querySelector('.user_email').value,
      sex: block.querySelector('[name="user_sex"]').value,
      address: {
        street: block.querySelector('.user_street').value,
        city: block.querySelector('.user_city').value,
        zipcode: block.querySelector('.user_zipcode').value
      }
    };
    usersData.push(userData);
  });

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(usersData, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "usersData.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
addUserBlock();