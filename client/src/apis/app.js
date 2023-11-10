import axios from '../axios'

export const apiGetCategories = () => axios({
    url: '/prodcategory/',
    method: 'get'
})