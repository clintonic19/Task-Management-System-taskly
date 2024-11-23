export const formatDate = (date) => {
    // Get the month, day, and year
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  };
  
  export function dateFormatter(dateString) {
    const inputDate = new Date(dateString);
  
    if (isNaN(inputDate)) {
      return "Invalid Date";
    }
  
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  // TO GET THE INITIAL NAME OF USERS
  export function getInitials(fullName) {
    const names = fullName?.split(", ");
  
    const initials = names?.slice(0, 2).map((name) => name[0].toUpperCase());
  
    const initialsStr = initials?.join("");
  
    return initialsStr;
  }

  // export const getInitials = (name) => {
  //   if (!name) return ''; // Return an empty string if name is undefined
  //   return name.split(' ').map((part) => part[0]).join('').toUpperCase();
  // };
  
  export const PRIOTISETASK = {
    high: "text-red-600",
    medium: "text-yellow-600",
    low: "text-orange-600",
  };
  
  // export const TASK_TYPE = {
  //   todo: "bg-blue-600",
  //   "in progress": "bg-yellow-600",
  //   completed: "bg-green-600",
  // };

  export const taskType = {
    todo: "bg-orange-600",
    "in-progress": "bg-yellow-500",
    completed: "bg-green-600",
  };
  
  export const RandomColor = [
    "bg-orange-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-green-600",
    "bg-blue-600",
  ];