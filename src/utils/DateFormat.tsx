import moment from "moment";


export const DateFormat = (date:any) => {
  return moment(date).format("Do MMM, YYYY");

  
}

