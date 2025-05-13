import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl);
const create = (newPerson) =>{
    return axios.post(baseUrl,newPerson);
}

const update = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

const updateNum = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
}

export default {getAll, create, update, updateNum}