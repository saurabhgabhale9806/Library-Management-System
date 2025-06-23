exports.getafterupdateissueBooks = (status, id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "UPDATE issue_details SET status = ? WHERE id = ?",
      [status, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};
function  updateStatus(){
const msg =confirm("do you want to update");

if (msg) {
    alert("Status updated succesfully");
}
else{
    alert("Status updation cancelled");
}
 }