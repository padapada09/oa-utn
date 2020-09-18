import { Book } from 'Types';

interface response {
    success?: boolean
    error?: boolean
};

export default async function addBook(book : Book) : Promise<response>{
    try {
        const {success, error} = await fetch(`${process.env.REACT_APP_SERVER_URL}/books/add`,{
            method: 'POST',
            body: JSON.stringify(book),
            headers:{
                'Content-Type': 'application/json',
                'Content': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }).then(res => res.json());
        
        if (success) {
            return Promise.resolve({success});
        } else {
            return Promise.resolve({error});
        }
    } catch (error) {
        return Promise.reject({error})
    };
};