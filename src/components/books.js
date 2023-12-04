import BookItem from "./bookItem";

// this declares a functional component named Books that takes a props parameter
// the component is designed to render a list of books based on the myBooks prop
function Books(props){
    // uses the map function to iterate over each element in the myBooks array
    return props.myBooks.map(
        // for each book in the myBooks array, it returns a BookItem component
        // passes the current book object as the myBook prop to the BookItem component
        // provides a unique key for React to update the list of components 
        // uses the _id property of the book object as the key
        // reload={()=>{props.Reload()}} triggers a reload of the book data
        (book)=>{
            return <BookItem myBook={book} key={book._id} reload={()=>{props.Reload()}}></BookItem>
        }
    );

}

export default Books;