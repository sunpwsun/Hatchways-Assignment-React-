import axios from 'axios'

// fetch the student list
export const fetchStuentList = async () => {

    return await axios.get( 'https://www.hatchways.io/api/assessment/students' )
}