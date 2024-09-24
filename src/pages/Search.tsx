import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getSearch } from '../functions/search'
const Search = () => {
    const [search] = useSearchParams()
    console.log(search.get("categoryId"))
    console.log(search.get("q"))
    useEffect(() => {
        if(search.get("q")){
            getSearch("q",search.get("q"))
        }
        if(search.get("categoryId")){
            getSearch("categoryId",search.get("categoryId"))
        }
    },[search])
    return (
        <div>search</div>
    )
}
export default Search