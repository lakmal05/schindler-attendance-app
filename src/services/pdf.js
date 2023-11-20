export async function generatePdf() {}
export const generatePdfffff = async () => {
  const leader_id = localStorage.getItem("leader_id");

  if (!!leader_id === true) {
    //call  with axios and  get data using leader id and refreance with member details
    //ex:fun getDataByLeaderId(leader_id)
    //after clear the localsotrage key "leader_id"
  } else {
    // throw excption please re enter leader details
  }
};
