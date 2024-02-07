export function sortArrayByName(array, isDesc) {
  return [...array].sort((a,b)=>{
    const valueA = a?.first_name?.toLowerCase() || a.last_name.toLowerCase();
    const valueB = b?.first_name?.toLowerCase() || b.last_name.toLowerCase();
    return  (isDesc ? -1 : 1) * (valueA > valueB ? 1 : -1);
  }).map((el,i)=>({id:i+1,...el}))
}