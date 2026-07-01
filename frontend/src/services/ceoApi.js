import axios from "axios";

export async function getCEOReport(){

const {data}=await axios.get(
"http://localhost:3000/api/ceo"
);

return data;

}