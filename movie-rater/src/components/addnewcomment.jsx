import { Link } from 'react-router-dom'
const AddNewComment = (props) => {
    console.log(props);

    const handleChange = (e) => {
        //e.preventDefault();
        const target = e.target;
        console.log(e.target);

        if (target.id === "userFistName")
            props.newReview.userFistName = target.value;
        if (target.id === "userLastName")
            props.newReview.userLastName = target.value;
        if (target.id === "userCommand")
            props.newReview.userCommand = target.value;
        if (target.id === "userRate")
            props.newReview.userRate = target.value;
        console.log(props.newReview);

    }


    return (<div>
        <h1>Please enter your comment here..</h1>
        <form>
            <div><p>{}</p></div>
            <div className="form-group">
                <label htmlFor="userFistName">First Name</label>
                <input
                    type="text"
                    name="userFistName"
                    id="userFistName"
                    className="form-control w-25 p-3"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="userLastName">Last Name</label>
                <input
                    type="text"
                    name="userLastName"
                    id="userLastName"
                    className="form-control w-25 p-3"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="userCommand">Comment:</label>
                <input
                    type="text"
                    name="userCommand"
                    id="userCommand"
                    className="form-control w-25 p-3"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="userRate">Rating from 1-5</label>
                <input
                    type="number"
                    name="userRate"
                    id="userRate"
                    className="form-control w-25 p-3"
                    onChange={handleChange}
                />
            </div>
            <button
                type="button"
                onClick={() => props.onAdd()}
                className="btn btn-primary m-2"
            >
                Submit
            </button>
            <Link to="/movies"><button type="button" className="btn btn-primary m-2">Movies</button></Link>

        </form>
    </div>);
}

export default AddNewComment;