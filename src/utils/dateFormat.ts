import moment from "moment";

export const dateFormat = (date: string) => {
  return moment(date).format("DD/MM/YYYY");
};
